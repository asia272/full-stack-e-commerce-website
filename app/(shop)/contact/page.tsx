import React from "react";
import Image from "next/image";
import Subscription from "@/components/Subscription";
import Title from "@/components/Title";

const Page = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* Contact Section */}
            <section className="mx-auto w-full max-w-[1240px] px-6 pb-20 pt-[90px] lg:px-0">

                {/* Page Heading */}

                <Title title="Contact" highlight="Us" />
                {/* Contact Content */}
                <div className="grid grid-cols-1 items-start gap-[70px] md:grid-cols-[598px_1fr] lg:gap-[100px]">

                    {/* Contact Image */}
                    <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                            src="/assets/frontend_assets/contact-image.png"
                            alt="Contact us"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 598px"
                            className="object-cover"
                        />
                    </div>

                    {/* Contact Information */}
                    <div className="flex min-h-[598px] flex-col justify-center">

                        {/* Store */}
                        <div>
                            <h2 className="font-[Outfit] text-[24px] font-semibold uppercase leading-[100%] text-[#4E4E4E]">
                                Our Store
                            </h2>

                            <div className="mt-[30px] font-[Outfit] text-[18px] font-normal leading-[180%] text-[#666]">
                                <p>54709 Willms Station</p>
                                <p>Suite 350, Washington, USA</p>
                            </div>

                            <div className="mt-[25px] font-[Outfit] text-[18px] font-normal leading-[180%] text-[#666]">
                                <p>Tel: (92) 3022094272</p>
                                <p>Email: example@gmail.com</p>
                            </div>
                        </div>

                        {/* Careers */}
                        <div className="mt-[65px]">
                            <h2 className="font-[Outfit] text-[24px] font-semibold uppercase leading-[100%] text-[#4E4E4E]">
                                Careers at Forever
                            </h2>

                            <p className="mt-[30px] max-w-[500px] font-[Outfit] text-[18px] font-normal leading-[180%] text-[#666]">
                                Learn more about our teams and job openings.
                            </p>

                            <button
                                type="button"
                                className="mt-[30px] h-[50px] min-w-[140px] border border-[#333] px-6 font-[Outfit] text-[14px] font-normal text-[#333] transition-all duration-300 hover:bg-black hover:text-white"
                            >
                                Explore Jobs
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reusable Subscription */}
                <Subscription />
            </section>
        </main>
    );
};

export default Page;