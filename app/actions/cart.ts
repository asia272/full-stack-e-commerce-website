"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

type AddToCartInput = {
    productId: string;
    size: "S" | "M" | "L" | "XL" | "XXL";
};

export async function addToCart({
    productId,
    size,
}: AddToCartInput) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return {
                success: false,
                message: "Please login to add products to your cart.",
            };
        }

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            select: {
                id: true,
                sizes: true,
            },
        });

        if (!product) {
            return {
                success: false,
                message: "Product not found.",
            };
        }

        if (!product.sizes.includes(size)) {
            return {
                success: false,
                message: "Selected size is not available.",
            };
        }

        const cart = await prisma.cart.upsert({
            where: {
                userId: session.user.id,
            },
            update: {},
            create: {
                userId: session.user.id,
            },
        });

        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId_size: {
                    cartId: cart.id,
                    productId: product.id,
                    size,
                },
            },
        });

        if (existingItem) {
            await prisma.cartItem.update({
                where: {
                    id: existingItem.id,
                },
                data: {
                    quantity: {
                        increment: 1,
                    },
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: product.id,
                    size,
                    quantity: 1,
                },
            });
        }

        revalidatePath("/cart");
        revalidatePath("/");

        return {
            success: true,
            message: "Product added to cart.",
        };
    } catch (error) {
        console.error("ADD TO CART ERROR:", error);

        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}




type CartSize = "S" | "M" | "L" | "XL" | "XXL";

async function getAuthenticatedUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        return null;
    }

    return session.user;
}

export async function updateCartItem(
    cartItemId: string,
    quantity: number
) {
    try {
        const user = await getAuthenticatedUser();

        if (!user) {
            return {
                success: false,
                message: "Please login to manage your cart.",
            };
        }

        if (
            !Number.isInteger(quantity) ||
            quantity < 1 ||
            quantity > 99
        ) {
            return {
                success: false,
                message: "Invalid quantity.",
            };
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: cartItemId,
                cart: {
                    userId: user.id,
                },
            },
        });

        if (!cartItem) {
            return {
                success: false,
                message: "Cart item not found.",
            };
        }

        await prisma.cartItem.update({
            where: {
                id: cartItem.id,
            },
            data: {
                quantity,
            },
        });

        revalidatePath("/cart");

        return {
            success: true,
            message: "Cart updated.",
        };
    } catch (error) {
        console.error("UPDATE CART ITEM ERROR:", error);

        return {
            success: false,
            message: "Unable to update cart.",
        };
    }
}

export async function removeCartItem(cartItemId: string) {
    try {
        const user = await getAuthenticatedUser();

        if (!user) {
            return {
                success: false,
                message: "Please login to manage your cart.",
            };
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: cartItemId,
                cart: {
                    userId: user.id,
                },
            },
        });

        if (!cartItem) {
            return {
                success: false,
                message: "Cart item not found.",
            };
        }

        await prisma.cartItem.delete({
            where: {
                id: cartItem.id,
            },
        });

        revalidatePath("/cart");

        return {
            success: true,
            message: "Item removed from cart.",
        };
    } catch (error) {
        console.error("REMOVE CART ITEM ERROR:", error);

        return {
            success: false,
            message: "Unable to remove item.",
        };
    }
}