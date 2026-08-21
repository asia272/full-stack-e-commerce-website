import { headers } from "next/headers";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

import PlaceOrderClient from "@/components/order/PlaceOrderClient";

const SHIPPING_COST = 10;

export default async function PlaceOrderPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        redirect("/login");
    }

    const cart = await prisma.cart.findUnique({
        where: {
            userId: session.user.id,
        },
        include: {
            items: {
                include: {
                    product: {
                        select: {
                            id: true,
                            price: true,
                        },
                    },
                },
            },
        },
    });

    if (!cart || cart.items.length === 0) {
        redirect("/cart");
    }

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

    return (
        <main className="mx-auto w-full max-w-[1450px] px-6 pb-24 pt-12 sm:px-8 lg:px-[5.5%] lg:pt-14">
            <PlaceOrderClient
                email={session.user.email}
                subtotal={subtotal}
                shippingCost={SHIPPING_COST}
            />
        </main>
    );
}