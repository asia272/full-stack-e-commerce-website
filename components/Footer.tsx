import Image from "next/image";
import Link from "next/link";

const companyLinks = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "About us",
        href: "/about",
    },
    {
        label: "Delivery",
        href: "/delivery",
    },
    {
        label: "Privacy policy",
        href: "/privacy-policy",
    },
];

export default function Footer() {
    return (
        <footer className="w-full bg-white text-[#626262]">
            <div
                className="
                    mx-auto
                    w-full
                    max-w-[2048px]
                    px-[20px]
                    md:px-[80px]
                "
            >
                {/* =====================================================
                    DESKTOP FOOTER
                    Your existing desktop design is preserved
                ====================================================== */}
                <div
                    className="
                        hidden
                        md:grid
                        md:grid-cols-[1fr_280px_340px]
                        md:gap-[70px]
                        md:pt-[220px]
                        md:pb-[72px]
                        lg:grid-cols-[1fr_320px_350px]
                        lg:gap-[90px]
                    "
                >
                    {/* ==============================
                        BRAND / DESCRIPTION
                    =============================== */}
                    <div className="max-w-[760px]">
                        <Link
                            href="/"
                            aria-label="Forever Home"
                            className="
                                mb-[56px]
                                flex
                                h-[47px]
                                w-[194px]
                                items-center
                            "
                        >
                            <Image
                                src="/assets/frontend_assets/logo.png"
                                alt="Forever"
                                width={194}
                                height={47}
                                priority
                                className="
                                    h-[47px]
                                    w-[194px]
                                    object-contain
                                "
                            />
                        </Link>

                        <p
                            className="
                                max-w-[750px]
                                text-[18px]
                                font-normal
                                leading-[1.72]
                                tracking-[-0.25px]
                                text-[#595959]
                            "
                        >
                            Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the
                            1500s, when an unknown printer took a galley of
                            type and scrambled it to make a type specimen
                            book.
                        </p>
                    </div>

                    {/* ==============================
                        COMPANY
                    =============================== */}
                    <div>
                        <h3
                            className="
                                mb-[52px]
                                text-[24px]
                                font-semibold
                                leading-none
                                tracking-[-0.7px]
                                text-[#5A5A5A]
                            "
                        >
                            COMPANY
                        </h3>

                        <nav className="flex flex-col gap-[20px]">
                            {companyLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="
                                        w-fit
                                        text-[20px]
                                        font-normal
                                        leading-[1.35]
                                        tracking-[-0.25px]
                                        text-[#626262]
                                        transition-colors
                                        duration-200
                                        hover:text-[#222222]
                                    "
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* ==============================
                        GET IN TOUCH
                    =============================== */}
                    <div>
                        <h3
                            className="
                                mb-[52px]
                                text-[24px]
                                font-semibold
                                leading-none
                                tracking-[-0.7px]
                                text-[#5A5A5A]
                            "
                        >
                            GET IN TOUCH
                        </h3>

                        <div className="flex flex-col gap-[20px]">
                            <a
                                href="tel:000000000000"
                                className="
                                    w-fit
                                    text-[20px]
                                    font-normal
                                    leading-[1.35]
                                    tracking-[-0.25px]
                                    text-[#626262]
                                    transition-colors
                                    duration-200
                                    hover:text-[#222222]
                                "
                            >
                                000000000000
                            </a>

                            <a
                                href="mailto:asiaashraf7272@gmail.com"
                                className="
                                    w-fit
                                    text-[20px]
                                    font-normal
                                    leading-[1.35]
                                    tracking-[-0.25px]
                                    text-[#626262]
                                    transition-colors
                                    duration-200
                                    hover:text-[#222222]
                                "
                            >
                                asiaashraf7272@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    MOBILE FOOTER
                    Matches your provided mobile screenshot
                ====================================================== */}
                <div
                    className="
                        flex
                        flex-col
                        items-center
                        pt-[180px]
                        pb-[48px]
                        md:hidden
                    "
                >
                    {/* ==============================
                        MOBILE LOGO
                    =============================== */}
                    <Link
                        href="/"
                        aria-label="Forever Home"
                        className="
                            flex
                            h-[47px]
                            w-[220px]
                            items-center
                            justify-center
                        "
                    >
                        <Image
                            src="/assets/frontend_assets/logo.png"
                            alt="Forever"
                            width={220}
                            height={47}
                            priority
                            className="
                                h-[47px]
                                w-[220px]
                                object-contain
                            "
                        />
                    </Link>

                    {/* ==============================
                        MOBILE DESCRIPTION
                    =============================== */}
                    <p
                        className="
                            mt-[66px]
                            w-full
                            max-w-[820px]
                            text-center
                            text-[18px]
                            font-normal
                            leading-[1.75]
                            tracking-[-0.25px]
                            text-[#595959]
                        "
                    >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                    </p>

                    {/* ==============================
                        MOBILE COMPANY LINKS
                    =============================== */}
                    <nav
                        className="
                            mt-[58px]
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-[39px]
                            whitespace-nowrap
                        "
                    >
                        {companyLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="
                                    text-[18px]
                                    font-normal
                                    leading-none
                                    tracking-[-0.25px]
                                    text-[#626262]
                                    transition-colors
                                    duration-200
                                    hover:text-[#222222]
                                "
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* ==============================
                        MOBILE CONTACT
                    =============================== */}
                    <div
                        className="
                            mt-[39px]
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-[28px]
                            whitespace-nowrap
                        "
                    >
                        <a
                            href="tel:000000000000"
                            className="
                                text-[18px]
                                font-normal
                                leading-none
                                tracking-[-0.25px]
                                text-[#626262]
                                transition-colors
                                duration-200
                                hover:text-[#222222]
                            "
                        >
                            000000000000
                        </a>

                        <a
                            href="mailto:asiaashraf7272@gmail.com"
                            className="
                                text-[18px]
                                font-normal
                                leading-none
                                tracking-[-0.25px]
                                text-[#626262]
                                transition-colors
                                duration-200
                                hover:text-[#222222]
                            "
                        >
                            asiaashraf7272@gmail.com
                        </a>
                    </div>
                </div>

                {/* =====================================================
                    DIVIDER
                    ====================================================== */}
                <div className="h-px w-full bg-[#c9c9c9]" />

                {/* =====================================================
                    COPYRIGHT
                ====================================================== */}
                <div
                    className="
                        flex
                        min-h-[98px]
                        items-center
                        justify-center
                        px-[10px]
                        text-center
                    "
                >
                    <p
                        className="
                            text-[18px]
                            font-normal
                            leading-[1.5]
                            tracking-[-0.25px]
                            text-[#626262]
                            md:text-[20px]
                            md:leading-none
                        "
                    >
                        Copyright {new Date().getFullYear()} © Forever - All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}