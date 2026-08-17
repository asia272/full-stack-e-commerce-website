"use client";

import React, { useState } from "react";

const Subscription = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) return;

        console.log("Subscribed:", email);
        setEmail("");
    };

    return (
        <section className="mt-[150px] w-full text-center">
            {/* Subscription Heading */}
            <h2 className="font-[Outfit] text-[34px] font-medium leading-[100%] tracking-normal text-[#373737]">
                Subscribe now & get 20% off
            </h2>

            {/* Description */}
            <p className="mx-auto mt-[20px] max-w-[650px] font-[Outfit] text-[18px] font-normal leading-[180%] text-[#9A9A9A]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
            </p>

            {/* Subscribe Form */}
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-[30px] flex h-[52px] w-full max-w-[500px]"
            >
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email id"
                    className="h-full flex-1 border border-[#C7C7C7] px-[16px] font-[Outfit] text-[13px] font-normal text-[#555] outline-none placeholder:text-[#aaa]"
                />

                <button
                    type="submit"
                    className="h-full w-[140px] bg-black font-[Outfit] text-[13px] font-medium uppercase text-white transition-opacity duration-300 hover:opacity-80"
                >
                    Subscribe
                </button>
            </form>
        </section>
    );
};

export default Subscription;