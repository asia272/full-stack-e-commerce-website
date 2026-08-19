"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    CirclePlus,
    ClipboardList,
    ShoppingBag,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";

const sidebarItems = [
    {
        label: "Add Items",
        href: "/admin/add",
        icon: CirclePlus,
    },
    {
        label: "List Items",
        href: "/admin/list",
        icon: ClipboardList,
    },
    {
        label: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => {
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Mobile menu button */}
            <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open admin menu"
                className="
                    fixed
                    left-[18px]
                    top-[105px]
                    z-40
                    flex
                    h-[42px]
                    w-[42px]
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-[#dfe3e8]
                    bg-white
                    text-[#30343a]
                    shadow-sm
                    lg:hidden
                "
            >
                <Menu size={22} strokeWidth={1.8} />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close admin menu"
                    onClick={() => setMobileOpen(false)}
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/20
                        lg:hidden
                    "
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed
                    left-0
                    top-[88px]
                    z-50
                    h-[calc(100vh-88px)]
                    w-[308px]
                    border-r
                    border-[#e3e6ea]
                    bg-[#f8fafc]
                    px-[54px]
                    py-[28px]
                    transition-transform
                    duration-300
                    lg:translate-x-0
                    ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >
                {/* Mobile close */}
                <div className="mb-[24px] flex justify-end lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close admin menu"
                        className="
                            flex
                            h-[34px]
                            w-[34px]
                            items-center
                            justify-center
                            text-[#444]
                        "
                    >
                        <X size={22} />
                    </button>
                </div>

                <nav className="flex flex-col gap-[18px]">
                    {sidebarItems.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`
                                    flex
                                    h-[47px]
                                    w-full
                                    items-center
                                    gap-[14px]
                                    rounded-[4px]
                                    border
                                    px-[14px]
                                    text-[17px]
                                    font-normal
                                    transition-colors
                                    duration-200
                                    ${active
                                        ? "border-[#d6a9b8] bg-[#fff0f4] text-[#303030]"
                                        : "border-[#dfe3e7] bg-[#f8fafc] text-[#34383d] hover:bg-white"
                                    }
                                `}
                            >
                                <Icon
                                    size={24}
                                    strokeWidth={1.7}
                                />

                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}