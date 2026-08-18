import Image from "next/image";

const policies = [
    {
        icon: "/assets/frontend_assets/exchange_icon.png",
        title: "Easy Exchange Policy",
        description: "We offer hassle free exchange policy",
    },
    {
        icon: "/assets/frontend_assets/quality_icon.png",
        title: "7 Days Return Policy",
        description: "We provide 7 days free return policy",
    },
    {
        icon: "/assets/frontend_assets/support_img.png",
        title: "Best Customer Support",
        description: "We provide 24/7 customer support",
    },
];

export default function PolicyFeatures() {
    return (
        <section className="w-full bg-white">
            <div
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-[2048px]
                    flex-col
                    px-[30px]
                    py-[100px]
                    sm:px-[50px]
                    md:flex-row
                    md:items-start
                    md:justify-between
                    md:px-[80px]
                    md:py-[115px]
                    lg:px-[120px]
                    lg:py-[130px]
                "
            >
                {policies.map((policy) => (
                    <div
                        key={policy.title}
                        className="
                            flex
                            w-full
                            flex-col
                            items-center
                            text-center
                            md:w-1/3
                        "
                    >
                        {/* Icon */}
                        <div
                            className="
                                flex
                                h-[54px]
                                w-[54px]
                                items-center
                                justify-center
                            "
                        >
                            <Image
                                src={policy.icon}
                                alt={policy.title}
                                width={47}
                                height={47}
                                className="
                                    h-[47px]
                                    w-[47px]
                                    object-contain
                                "
                            />
                        </div>

                        {/* Heading */}
                        <h3
                            className="
                                mt-[30px]
                                text-[18px]
                                font-semibold
                                leading-none
                                tracking-[-0.35px]
                                text-[#373737]
                            "
                        >
                            {policy.title}
                        </h3>

                        {/* Description */}
                        <p
                            className="
                                mt-[14px]
                                text-[18px]
                                font-normal
                                leading-[1.4]
                                tracking-[-0.25px]
                                text-[#898989]
                            "
                        >
                            {policy.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}