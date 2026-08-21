import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";

import prisma from "@/lib/prisma";
import Stripe from "stripe";



export async function POST(request: NextRequest) {
    const body = await request.text();

    const signature =
        request.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
            {
                error: "Missing Stripe signature.",
            },
            {
                status: 400,
            }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        console.error(
            "STRIPE WEBHOOK SIGNATURE ERROR:",
            error
        );

        return NextResponse.json(
            {
                error: "Invalid Stripe signature.",
            },
            {
                status: 400,
            }
        );
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session =
                    event.data.object as Stripe.Checkout.Session;

                await handleCheckoutCompleted(session);

                break;
            }

            case "checkout.session.async_payment_succeeded": {
                const session =
                    event.data.object as Stripe.Checkout.Session;

                await handleCheckoutCompleted(session);

                break;
            }

            case "checkout.session.async_payment_failed": {
                const session =
                    event.data.object as Stripe.Checkout.Session;

                await handleCheckoutFailed(session);

                break;
            }

            case "payment_intent.payment_failed": {
                const paymentIntent =
                    event.data.object as Stripe.PaymentIntent;

                await handlePaymentIntentFailed(
                    paymentIntent
                );

                break;
            }

            default:
                console.log(
                    `Unhandled Stripe event: ${event.type}`
                );
        }

        return NextResponse.json({
            received: true,
        });
    } catch (error) {
        console.error(
            "STRIPE WEBHOOK HANDLER ERROR:",
            error
        );

        return NextResponse.json(
            {
                error: "Webhook handler failed.",
            },
            {
                status: 500,
            }
        );
    }
}

/* =========================================
   PAYMENT SUCCESS
========================================= */

async function handleCheckoutCompleted(
    session: Stripe.Checkout.Session
) {
    const orderId = session.metadata?.orderId;

    if (!orderId) {
        console.error(
            "Stripe session is missing orderId metadata."
        );

        return;
    }

    /*
     * Stripe Checkout can be completed while the
     * payment is still processing for some payment
     * methods.
     *
     * We only mark the order as PAID when Stripe
     * confirms that the payment is actually paid.
     */

    if (session.payment_status !== "paid") {
        console.log(
            `Order ${orderId} checkout completed but payment is not paid yet.`
        );

        return;
    }

    const paymentIntentId =
        typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null;

    /*
     * Idempotency:
     *
     * If Stripe sends the same webhook again and
     * the order is already PAID, don't process it
     * again.
     */

    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        select: {
            id: true,
            userId: true,
            paymentStatus: true,
            stripeSessionId: true,
        },
    });

    if (!order) {
        console.error(
            `Order ${orderId} was not found.`
        );

        return;
    }

    if (order.paymentStatus === "PAID") {
        console.log(
            `Order ${orderId} is already paid.`
        );

        return;
    }

    /*
     * Make sure this Stripe session belongs
     * to this order.
     */

    if (
        order.stripeSessionId &&
        order.stripeSessionId !== session.id
    ) {
        console.error(
            `Stripe session mismatch for order ${orderId}.`
        );

        return;
    }

    /*
     * Update order and clear cart in one transaction.
     */

    await prisma.$transaction(async (tx) => {
        await tx.order.update({
            where: {
                id: orderId,
            },
            data: {
                paymentStatus: "PAID",

                stripeSessionId: session.id,

                stripePaymentId:
                    paymentIntentId,
            },
        });

        /*
         * Remove the user's cart after successful
         * payment.
         */
        await tx.cartItem.deleteMany({
            where: {
                cart: {
                    userId: order.userId,
                },
            },
        });
    });

    console.log(
        `Order ${orderId} successfully marked as PAID.`
    );
}

/* =========================================
   ASYNC PAYMENT FAILED
========================================= */

async function handleCheckoutFailed(
    session: Stripe.Checkout.Session
) {
    const orderId = session.metadata?.orderId;

    if (!orderId) {
        return;
    }

    await prisma.order.updateMany({
        where: {
            id: orderId,
            paymentStatus: "PENDING",
        },
        data: {
            paymentStatus: "FAILED",
        },
    });

    console.log(
        `Payment failed for order ${orderId}.`
    );
}

/* =========================================
   PAYMENT INTENT FAILED
========================================= */

async function handlePaymentIntentFailed(
    paymentIntent: Stripe.PaymentIntent
) {
    const orderId =
        paymentIntent.metadata?.orderId;

    if (!orderId) {
        return;
    }

    await prisma.order.updateMany({
        where: {
            id: orderId,
            paymentStatus: "PENDING",
        },
        data: {
            paymentStatus: "FAILED",
        },
    });

    console.log(
        `Payment intent failed for order ${orderId}.`
    );
}