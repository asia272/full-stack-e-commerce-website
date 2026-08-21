"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";

import {
    removeCartItem,
    updateCartItem,
} from "@/app/actions/cart";

type CartItem = {
    id: string;
    quantity: number;
    size: "S" | "M" | "L" | "XL" | "XXL";
    product: {
        id: string;
        name: string;
        price: number;
        image: string[];
    };
};

type CartClientProps = {
    items: CartItem[];
    shippingCost: number;
};

export default function CartClient({
    items,
    shippingCost,
}: CartClientProps) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const subtotal = items.reduce(
        (total, item) =>
            total +
            item.product.price * item.quantity,
        0
    );

    const total =
        subtotal +
        (items.length > 0 ? shippingCost : 0);

    const handleQuantityChange = (
        event: ChangeEvent<HTMLInputElement>,
        itemId: string
    ) => {
        const quantity = Number(event.target.value);

        if (!Number.isInteger(quantity)) {
            return;
        }

        if (quantity < 1 || quantity > 99) {
            return;
        }

        startTransition(async () => {
            const result = await updateCartItem(
                itemId,
                quantity
            );

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            router.refresh();
        });
    };

    const handleRemove = (itemId: string) => {
        startTransition(async () => {
            const result = await removeCartItem(itemId);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success("Item removed from cart.");

            router.refresh();
        });
    };

    if (items.length === 0) {
        return (
            <div className="py-24 text-center">
                <h2 className="text-[24px] font-medium text-[#333]">
                    Your cart is empty
                </h2>

                <p className="mt-3 text-[13px] text-[#777]">
                    Add some products to your cart to continue shopping.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* CART ITEMS */}
            <div className="border-t border-[#e5e5e5]">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`relative grid grid-cols-1 gap-5 border-b border-[#e5e5e5] py-5 transition-opacity sm:grid-cols-[105px_1fr_130px_45px] sm:items-center sm:gap-5 lg:grid-cols-[105px_1fr_130px_45px] ${isPending ? "opacity-60" : ""
                            }`}
                    >
                        {/* PRODUCT IMAGE */}
                        <div className="relative h-[120px] w-[105px] overflow-hidden bg-[#f5f5f5]">
                            <Image
                                src={item.product.image[0]}
                                alt={item.product.name}
                                fill
                                sizes="105px"
                                className="object-cover"
                            />
                        </div>

                        {/* PRODUCT INFO */}
                        <div className="min-w-0">
                            <h2 className="text-[17px] font-medium leading-6 text-[#333] sm:text-[18px]">
                                {item.product.name}
                            </h2>

                            <div className="mt-4 flex items-center gap-5">
                                <span className="text-[18px] text-[#555]">
                                    ${item.product.price.toFixed(0)}
                                </span>

                                <span className="flex h-11 min-w-11 items-center justify-center border border-[#e5e5e5] px-3 text-[14px] text-[#333]">
                                    {item.size}
                                </span>
                            </div>
                        </div>

                        {/* QUANTITY */}
                        <div className="flex items-center sm:justify-center">
                            <input
                                type="number"
                                min={1}
                                max={99}
                                defaultValue={item.quantity}
                                onChange={(event) =>
                                    handleQuantityChange(
                                        event,
                                        item.id
                                    )
                                }
                                disabled={isPending}
                                aria-label={`Quantity for ${item.product.name}`}
                                className="h-12 w-[130px] border border-[#e5e5e5] bg-white px-3 text-[16px] text-[#555] outline-none transition focus:border-[#aaa] disabled:cursor-not-allowed"
                            />
                        </div>

                        {/* REMOVE */}
                        <button
                            type="button"
                            onClick={() =>
                                handleRemove(item.id)
                            }
                            disabled={isPending}
                            aria-label={`Remove ${item.product.name} from cart`}
                            className="absolute right-0 top-5 flex h-10 w-10 items-center justify-center text-[#555] transition hover:text-black disabled:cursor-not-allowed sm:static"
                        >
                            <Trash2
                                size={22}
                                strokeWidth={1.5}
                            />
                        </button>
                    </div>
                ))}
            </div>

            {/* CART TOTALS */}
            <div className="mt-16 flex justify-end">
                <div className="w-full max-w-[600px]">
                    {/* TITLE */}
                    <div className="mb-8 flex items-center gap-4">
                        <h2 className="text-[24px] font-light uppercase text-[#777]">
                            Cart{" "}
                            <span className="font-semibold text-[#333]">
                                Totals
                            </span>
                        </h2>

                        <span className="h-px w-10 bg-[#333]" />
                    </div>

                    {/* SUBTOTAL */}
                    <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-5 text-[14px]">
                        <span className="font-medium text-[#555]">
                            Subtotal
                        </span>

                        <span className="text-[#555]">
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>

                    {/* SHIPPING */}
                    <div className="flex items-center justify-between border-b border-[#e5e5e5] py-5 text-[14px]">
                        <span className="font-medium text-[#555]">
                            Shipping Fee
                        </span>

                        <span className="text-[#555]">
                            ${shippingCost.toFixed(0)}
                        </span>
                    </div>

                    {/* TOTAL */}
                    <div className="flex items-center justify-between pt-5 text-[16px]">
                        <span className="font-semibold text-[#444]">
                            Total
                        </span>

                        <span className="font-medium text-[#444]">
                            ${total.toFixed(2)}
                        </span>
                    </div>

                    {/* CHECKOUT */}
                    <div className="mt-10 flex justify-end">
                        <button
                            type="button"
                            onClick={() =>
                                router.push("/place-order")
                            }
                            className="h-[55px] min-w-[240px] bg-black px-8 text-[13px] font-medium text-white transition hover:bg-[#222]"
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}