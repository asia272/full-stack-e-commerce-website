"use client";

import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

import { placeOrder } from "@/app/actions/order";

type PlaceOrderClientProps = {
    email: string;
    subtotal: number;
    shippingCost: number;
};

export default function PlaceOrderClient({
    email,
    subtotal,
    shippingCost,
}: PlaceOrderClientProps) {
    const [paymentMethod, setPaymentMethod] =
        useState<"STRIPE" | "COD">("STRIPE");

    const [isPending, startTransition] =
        useTransition();

    const total = subtotal + shippingCost;

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const firstName =
            String(formData.get("firstName") || "");

        const lastName =
            String(formData.get("lastName") || "");

        const emailValue =
            String(formData.get("email") || "");

        const street =
            String(formData.get("street") || "");

        const city =
            String(formData.get("city") || "");

        const state =
            String(formData.get("state") || "");

        const zipCode =
            String(formData.get("zipCode") || "");

        const country =
            String(formData.get("country") || "");

        const phone =
            String(formData.get("phone") || "");

        startTransition(async () => {
            const result = await placeOrder({
                firstName,
                lastName,
                email: emailValue,
                street,
                city,
                state,
                zipCode,
                country,
                phone,
                paymentMethod,
            });

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            if (
                result.paymentMethod === "STRIPE" &&
                result.url
            ) {
                window.location.href = result.url;
                return;
            }

            if (
                result.paymentMethod === "COD"
            ) {
                toast.success(
                    "Your order has been placed successfully."
                );

                window.location.href =
                    `/orders`;
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr]"
        >
            {/* =================================
                LEFT - DELIVERY INFORMATION
            ================================== */}

            <section>
                {/* TITLE */}
                <div className="mb-10 flex items-center gap-4">
                    <h1 className="text-[27px] font-light uppercase leading-none text-[#777]">
                        Delivery{" "}
                        <span className="font-semibold text-[#333]">
                            Information
                        </span>
                    </h1>

                    <span className="mt-1 h-px w-10 bg-[#333]" />
                </div>

                {/* FIRST + LAST NAME */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        required
                        className="h-12 w-full border border-[#d7d7d7] px-3 text-[14px] text-[#555] outline-none placeholder:text-[#999] focus:border-[#999]"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        required
                        className="h-12 w-full border border-[#d7d7d7] px-3 text-[14px] text-[#555] outline-none placeholder:text-[#999] focus:border-[#999]"
                    />
                </div>

                {/* EMAIL */}
                <input
                    type="email"
                    name="email"
                    defaultValue={email}
                    placeholder="Email address"
                    required
                    className="mt-7 h-12 w-full border border-[#d7d7d7] px-3 text-[14px] text-[#555] outline-none placeholder:text-[#999] focus:border-[#999]"
                />

                {/* STREET */}
                <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    required
                    className="mt-7 h-12 w-full border border-[#d7d7d7] px-3 text-[14px] text-[#555] outline-none placeholder:text-[#999] focus:border-[#999]"
                />

                {/* CITY + STATE */}
                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        required
                        className="h-12 w-full border border-[#d7d7d7] px-3 text-[14px] text-[#555] outline-none placeholder:text-[#999] focus:border-[#999]"
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        required
                        className="h-12 w-full border border-[#d7d7d7] px-3 text-[14px] text-[#555] outline-none placeholder:text-[#999] focus:border-[#999]"
                    />
                </div>

                {/* ZIP + COUNTRY */}
                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip code"
                        required
                        className="h-12 w-full border border-[#d7d7d7] px-3 text-[14px] text-[#555] outline-none placeholder:text-[#999] focus:border-[#999]"
                    />

                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        required
                        className="h-12 w-full border border-[#d7d7d7] px-3 text-[14px] text-[#555] outline-none placeholder:text-[#999] focus:border-[#999]"
                    />
                </div>

                {/* PHONE */}
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    required
                    className="mt-7 h-12 w-full border border-[#d7d7d7] px-3 text-[14px] text-[#555] outline-none placeholder:text-[#999] focus:border-[#999]"
                />
            </section>

            {/* =================================
                RIGHT - ORDER + PAYMENT
            ================================== */}

            <section>
                {/* CART TOTALS */}
                <div className="pt-0 lg:pt-[60px]">
                    <div className="mb-9 flex items-center gap-4">
                        <h2 className="text-[27px] font-light uppercase leading-none text-[#777]">
                            Cart{" "}
                            <span className="font-semibold text-[#333]">
                                Totals
                            </span>
                        </h2>

                        <span className="mt-1 h-px w-10 bg-[#333]" />
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
                            Shipping Free
                        </span>

                        <span className="text-[#555]">
                            ${shippingCost}
                        </span>
                    </div>

                    {/* TOTAL */}
                    <div className="flex items-center justify-between pt-5 text-[15px]">
                        <span className="font-semibold text-[#444]">
                            Total
                        </span>

                        <span className="font-medium text-[#444]">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* PAYMENT METHOD */}
                <div className="mt-20">
                    <div className="mb-9 flex items-center gap-4">
                        <h2 className="text-[19px] font-light uppercase leading-none text-[#777]">
                            Payment{" "}
                            <span className="font-semibold text-[#333]">
                                Method
                            </span>
                        </h2>

                        <span className="mt-1 h-px w-10 bg-[#333]" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* STRIPE */}
                        <button
                            type="button"
                            onClick={() =>
                                setPaymentMethod("STRIPE")
                            }
                            className={`flex h-[52px] items-center gap-4 border px-4 transition ${paymentMethod === "STRIPE"
                                    ? "border-[#aaa]"
                                    : "border-[#d7d7d7]"
                                }`}
                        >
                            <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full border ${paymentMethod ===
                                        "STRIPE"
                                        ? "border-[#635bff]"
                                        : "border-[#bbb]"
                                    }`}
                            >
                                {paymentMethod ===
                                    "STRIPE" && (
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#635bff]" />
                                    )}
                            </span>

                            <span className="text-[17px] font-semibold tracking-tight text-[#635bff]">
                                stripe
                            </span>
                        </button>

                        {/* CASH ON DELIVERY */}
                        <button
                            type="button"
                            onClick={() =>
                                setPaymentMethod("COD")
                            }
                            className={`flex h-[52px] items-center gap-4 border px-4 transition ${paymentMethod === "COD"
                                    ? "border-[#aaa]"
                                    : "border-[#d7d7d7]"
                                }`}
                        >
                            <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full border ${paymentMethod === "COD"
                                        ? "border-black"
                                        : "border-[#bbb]"
                                    }`}
                            >
                                {paymentMethod ===
                                    "COD" && (
                                        <span className="h-2.5 w-2.5 rounded-full bg-black" />
                                    )}
                            </span>

                            <span className="text-[13px] font-medium uppercase text-[#777]">
                                Cash on delivery
                            </span>
                        </button>
                    </div>

                    {/* PLACE ORDER */}
                    <div className="mt-12 flex justify-end">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="h-[56px] min-w-[250px] bg-black px-10 text-[13px] font-medium uppercase text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isPending
                                ? paymentMethod ===
                                    "STRIPE"
                                    ? "REDIRECTING..."
                                    : "PLACING ORDER..."
                                : "PLACE ORDER"}
                        </button>
                    </div>
                </div>
            </section>
        </form>
    );
}