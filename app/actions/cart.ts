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