import Image from "next/image";
import Link from "next/link";

export default function AdminHeader() {
    return (
        <header
            className="
                h-[88px]
                w-full
                border-b
                border-[#e5e7eb]
                bg-[#f8fafc]
            "
        >
            <div
                className="
                    flex
                    h-full
                    items-center
                    justify-between
                    px-[32px]
                    md:px-[54px]
                "
            >
                {/* Logo */}
                <Link
                    href="/admin"
                    aria-label="Forever Admin Dashboard"
                    className="
                        flex
                        flex-col
                        items-start
                        justify-center
                    "
                >
                    <Image
                        src="/assets/frontend_assets/logo.png"
                        alt="Forever"
                        width={164}
                        height={47}
                        priority
                        className="
                            h-[43px]
                            w-[164px]
                            object-contain
                        "
                    />

                    <span
                        className="
                            -mt-[3px]
                            ml-[1px]
                            text-[15px]
                            font-medium
                            leading-none
                            tracking-[-0.3px]
                            text-[#c99aae]
                        "
                    >
                        ADMIN PANEL
                    </span>
                </Link>

                {/* Logout */}
                <button
                    type="button"
                    className="
                        flex
                        h-[42px]
                        min-w-[116px]
                        items-center
                        justify-center
                        rounded-full
                        bg-[#566071]
                        px-[24px]
                        text-[15px]
                        font-medium
                        text-white
                        transition-colors
                        duration-200
                        hover:bg-[#414a59]
                    "
                >
                    Logout
                </button>
            </div>
        </header>
    );
}