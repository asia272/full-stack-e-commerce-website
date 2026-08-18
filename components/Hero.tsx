import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="w-full bg-white px-[32px] pt-[26px]">
            <div
                className="
                    relative
                    mx-auto
                    grid
                    w-full
                    max-w-[1984px]
                    overflow-hidden
                    border
                    border-[#c9c9c9]
                    lg:grid-cols-2
                "
            >
                {/* =================================================
                    LEFT CONTENT
                ================================================== */}
                <div
                    className="
                        relative
                        flex
                        min-h-[500px]
                        items-center
                        bg-white
                        px-[55px]
                        py-[90px]
                        sm:min-h-[600px]
                        sm:px-[75px]
                        lg:min-h-[732px]
                        lg:px-[122px]
                        lg:py-0
                    "
                >
                    <div className="w-full max-w-[560px]">
                        {/* Small heading */}
                        <div
                            className="
                                mb-[22px]
                                flex
                                items-center
                                gap-[10px]
                            "
                        >
                            <span
                                className="
                                    block
                                    h-[2px]
                                    w-[54px]
                                    bg-[#3f3f3f]
                                "
                            />

                            <p
                                className="
                                    text-[17px]
                                    font-medium
                                    leading-none
                                    tracking-[-0.3px]
                                    text-[#414141]
                                "
                            >
                                OUR BESTSELLERS
                            </p>
                        </div>

                        {/* Main Heading */}
                        <h1
                            className="
                                whitespace-nowrap
                                text-[58px]
                                font-normal
                                leading-[0.98]
                                tracking-[-2.8px]
                                text-[#414141]
                                sm:text-[68px]
                                lg:text-[78px]
                            "
                            style={{
                                fontFamily:
                                    "Georgia, 'Times New Roman', serif",
                            }}
                        >
                            Latest Arrivals
                        </h1>

                        {/* Shop Now */}
                        <Link
                            href="/products"
                            className="
                                mt-[29px]
                                inline-flex
                                items-center
                                gap-[8px]
                                text-[17px]
                                font-semibold
                                leading-none
                                tracking-[-0.35px]
                                text-[#414141]
                                transition-opacity
                                duration-200
                                hover:opacity-60
                            "
                        >
                            <span>SHOP NOW</span>

                            <span
                                className="
                                    mt-[2px]
                                    block
                                    h-[1.5px]
                                    w-[57px]
                                    bg-[#555555]
                                "
                            />
                        </Link>
                    </div>
                </div>

                {/* =================================================
                    RIGHT IMAGE
                ================================================== */}
                <div
                    className="
                        relative
                        min-h-[500px]
                        w-full
                        bg-[#fbd8d5]
                        sm:min-h-[600px]
                        lg:min-h-[732px]
                    "
                >
                    <Image
                        src="/assets/frontend_assets/hero_img.png"
                        alt="Latest Arrivals"
                        fill
                        priority
                        sizes="
                            (max-width: 1023px) 100vw,
                            50vw
                        "
                        className="
                            object-cover
                            object-center
                        "
                    />
                </div>
            </div>
        </section>
    );
}