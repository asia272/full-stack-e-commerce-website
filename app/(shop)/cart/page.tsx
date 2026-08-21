import { headers } from "next/headers";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import CartClient from "@/components/cart/CartClient";

export default async function CartPage() {
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
                orderBy: {
                    createdAt: "asc",
                },
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });

    const items =
        cart?.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            size: item.size,
            product: {
                id: item.product.id,
                name: item.product.name,
                price: Number(item.product.price),
                image: item.product.image,
            },
        })) ?? [];

    return (
        <main className="mx-auto w-full max-w-[1450px] px-6 pb-24 pt-12 sm:px-8 lg:px-[6.5%] lg:pt-14">
            {/* PAGE TITLE */}
            <div className="mb-10 flex items-center gap-4">
                <h1 className="text-[27px] font-light uppercase leading-none text-[#777]">
                    Your{" "}
                    <span className="font-semibold text-[#333]">
                        Cart
                    </span>
                </h1>

                <span className="mt-1 h-px w-10 bg-[#333]" />
            </div>

            <CartClient
                items={items}
                shippingCost={10}
            />
        </main>
    );
}