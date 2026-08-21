"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type PaymentMethod = "STRIPE" | "COD";

type PlaceOrderInput = {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    paymentMethod: PaymentMethod;
};

const SHIPPING_COST = 10;

async function getAuthenticatedUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        return null;
    }

    return session.user;
}

export async function placeOrder(input: PlaceOrderInput) {
    try {
        const user = await getAuthenticatedUser();

        if (!user) {
            return {
                success: false,
                message: "Please login before placing an order.",
            };
        }

        /* --------------------------------
           VALIDATE DELIVERY INFORMATION
        --------------------------------- */

        const requiredFields = [
            input.firstName,
            input.lastName,
            input.email,
            input.street,
            input.city,
            input.state,
            input.zipCode,
            input.country,
            input.phone,
        ];

        if (requiredFields.some((field) => !field?.trim())) {
            return {
                success: false,
                message: "Please fill in all delivery information.",
            };
        }

        if (!input.email.includes("@")) {
            return {
                success: false,
                message: "Please enter a valid email address.",
            };
        }

        if (
            input.paymentMethod !== "STRIPE" &&
            input.paymentMethod !== "COD"
        ) {
            return {
                success: false,
                message: "Invalid payment method.",
            };
        }

        /* --------------------------------
           GET USER CART
        --------------------------------- */

        const cart = await prisma.cart.findUnique({
            where: {
                userId: user.id,
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
            },
        });

        if (!cart || cart.items.length === 0) {
            return {
                success: false,
                message: "Your cart is empty.",
            };
        }

        /* --------------------------------
           CALCULATE TOTALS ON SERVER
        --------------------------------- */

        const subtotal = cart.items.reduce(
            (total, item) => {
                return (
                    total +
                    Number(item.product.price) *
                    item.quantity
                );
            },
            0
        );

        const total = subtotal + SHIPPING_COST;

        /* --------------------------------
           CREATE ORDER
        --------------------------------- */

        const order = await prisma.$transaction(
            async (tx) => {
                const newOrder = await tx.order.create({
                    data: {
                        userId: user.id,

                        status: "ORDER_PLACED",

                        paymentStatus: "PENDING",

                        paymentMethod:
                            input.paymentMethod === "STRIPE"
                                ? "STRIPE"
                                : "COD",

                        subtotal,

                        shippingCost: SHIPPING_COST,

                        total,

                        items: {
                            create: cart.items.map((item) => ({
                                productId: item.product.id,
                                quantity: item.quantity,
                                price: item.product.price,
                                size: item.size,
                            })),
                        },

                        deliveryInfo: {
                            create: {
                                firstName:
                                    input.firstName.trim(),

                                lastName:
                                    input.lastName.trim(),

                                email:
                                    input.email.trim(),

                                street:
                                    input.street.trim(),

                                city:
                                    input.city.trim(),

                                state:
                                    input.state.trim(),

                                zipCode:
                                    input.zipCode.trim(),

                                country:
                                    input.country.trim(),

                                phone:
                                    input.phone.trim(),
                            },
                        },
                    },

                    select: {
                        id: true,
                        total: true,
                    },
                });

                return newOrder;
            }
        );

        /* --------------------------------
           CASH ON DELIVERY
        --------------------------------- */

        if (input.paymentMethod === "COD") {
            await prisma.cartItem.deleteMany({
                where: {
                    cartId: cart.id,
                },
            });

            revalidatePath("/cart");
            revalidatePath("/place-order");
            revalidatePath("/orders");

            return {
                success: true,
                paymentMethod: "COD",
                message: "Order placed successfully.",
                orderId: order.id,
            };
        }

        /* --------------------------------
           STRIPE CHECKOUT
        --------------------------------- */

        const checkoutSession =
            await stripe.checkout.sessions.create({
                mode: "payment",

                customer_email: input.email.trim(),

                line_items: cart.items.map((item) => ({
                    price_data: {
                        currency: "usd",

                        product_data: {
                            name: item.product.name,
                        },

                        unit_amount: Math.round(
                            Number(item.product.price) * 100
                        ),
                    },

                    quantity: item.quantity,
                })),

                shipping_address_collection: {
                    allowed_countries: [
                        "PK",
                        "US",
                        "GB",
                        "CA",
                        "AE",
                    ],
                },

                metadata: {
                    orderId: order.id,
                    userId: user.id,
                },

                payment_intent_data: {
                    metadata: {
                        orderId: order.id,
                        userId: user.id,
                    },
                },

                success_url:
                    `${process.env.NEXT_PUBLIC_APP_URL}` +
                    `/orders`,

                cancel_url:
                    `${process.env.NEXT_PUBLIC_APP_URL}` +
                    `/place-order`,
            });

        /* --------------------------------
           SAVE STRIPE SESSION ID
        --------------------------------- */

        await prisma.order.update({
            where: {
                id: order.id,
            },

            data: {
                stripeSessionId: checkoutSession.id,
            },
        });

        return {
            success: true,
            paymentMethod: "STRIPE",
            message: "Redirecting to Stripe...",
            url: checkoutSession.url,
        };
    } catch (error) {
        console.error("PLACE ORDER ERROR:", error);

        return {
            success: false,
            message: "Something went wrong while placing your order.",
        };
    }
}