import Title from "@/components/Title";

const whyChooseUsCards = [
    {
        title: "QUALITY ASSURANCE:",
        description:
            "We Meticulously Select And Vet Each Product To Ensure It Meets Our Stringent Quality Standards.",
    },
    {
        title: "CONVENIENCE:",
        description:
            "With Our User-Friendly Interface And Hassle-Free Ordering Process, Shopping Has Never Been Easier.",
    },
    {
        title: "EXCEPTIONAL CUSTOMER SERVICE:",
        description:
            "Our Team Of Dedicated Professionals Is Here To Assist You The Way, Ensuring Your Satisfaction Is Our Top Priority.",
    },
];

const About = () => {
    return (
        <div className="w-full bg-white font-[Outfit,sans-serif] text-[#707070]">

            {/* ================= ABOUT US ================= */}
            <section className="mx-auto w-[calc(100%-40px)] max-w-[1758px] pt-10 sm:w-[calc(100%-60px)] lg:w-[calc(100%-80px)] xl:w-[calc(100%-120px)]">

                {/* ABOUT US TITLE */}
                <Title title="About" highlight="Us" />

                {/* ABOUT CONTENT */}
                <div className="flex flex-col items-start gap-10 lg:gap-[55px] xl:flex-row xl:gap-[80px] 2xl:gap-[128px]">

                    {/* IMAGE */}
                    <div className="w-full shrink-0 overflow-hidden xl:h-[697px] xl:w-[686px]">
                        <img
                            src="/about-image.png"
                            alt="About us"
                            className="block aspect-[686/697] h-auto w-full object-cover xl:h-[697px] xl:w-[686px]"
                        />
                    </div>


                    {/* TEXT CONTENT */}
                    <div className="w-full max-w-[780px] pt-0 xl:pt-[118px]">

                        <p className="mb-10 text-[14px] font-normal leading-[180%] tracking-[0] capitalize text-[#6D6D6D] xl:text-[18px]">
                            Forever Was Born Out Of A Passion For Innovation And A Desire
                            To Revolutionize The Way People Shop Online. Our Journey Began
                            With A Simple Idea: To Provide A Platform Where Customers Can
                            Easily Discover, Explore, And Purchase A Wide Range Of Products
                            From The Comfort Of Their Homes.
                        </p>

                        <p className="mb-10 text-[14px] font-normal leading-[180%] tracking-[0] capitalize text-[#6D6D6D] xl:text-[18px]">
                            Since Our Inception, We've Worked Tirelessly To Curate A Diverse
                            Selection Of High-Quality Products That Cater To Every Taste And
                            Preference. From Fashion And Beauty To Electronics And Home
                            Essentials, We Offer An Extensive Collection Sourced From Trusted
                            Brands And Suppliers.
                        </p>

                        <h3 className="mb-[36px] text-[15px] font-bold leading-[180%] tracking-[0] capitalize text-[#222222] xl:text-[19px]">
                            Our Mission
                        </h3>

                        <p className="text-[14px] font-normal leading-[180%] tracking-[0] capitalize text-[#6D6D6D] xl:text-[18px]">
                            Our Mission At Forever Is To Empower Customers With Choice,
                            Convenience, And Confidence. We're Dedicated To Providing A
                            Seamless Shopping Experience That Exceeds Expectations, From
                            Browsing And Ordering To Delivery And Beyond.
                        </p>

                    </div>
                </div>
            </section>


            {/* ================= WHY CHOOSE US ================= */}
            <section className="mx-auto w-[calc(100%-40px)] max-w-[1758px] pb-20 pt-[65px] sm:w-[calc(100%-60px)] sm:pt-[80px] lg:w-[calc(100%-80px)] lg:pt-[100px] xl:w-[calc(100%-120px)] xl:pt-[122px]">

                {/* WHY CHOOSE US TITLE */}
                <Title
                    title="Why"
                    highlight="Choose Us"
                    align="start"
                />

                {/* CARDS */}
                <div className="grid w-full grid-cols-1 border border-[#d0d0d0] lg:grid-cols-3">

                    {whyChooseUsCards.map((card, index) => (
                        <div
                            key={card.title}
                            className={`min-h-[280px] px-[25px] py-[35px] sm:px-[40px] sm:py-[45px] lg:border-b-0 lg:px-[45px] lg:py-[60px] xl:px-[62px] xl:pb-[55px] xl:pt-[81px] ${index < whyChooseUsCards.length - 1
                                ? "border-b border-[#d0d0d0] lg:border-r"
                                : ""
                                }`}
                        >
                            <h3 className="mb-[18px] text-[14px] font-semibold uppercase leading-[180%] text-[#2A2A2A] xl:mb-[26px] xl:text-[18px]">
                                {card.title}
                            </h3>

                            <p className="max-w-[290px] text-[14px] font-normal leading-[180%] capitalize text-[#6D6D6D] xl:text-[18px]">
                                {card.description}
                            </p>
                        </div>
                    ))}

                </div>
            </section>

        </div>
    );
};

export default About;
