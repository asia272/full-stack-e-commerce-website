"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Search,
    UserRound,
    ShoppingBag,
    Menu,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const navItems = [
    {
        label: "HOME",
        href: "/",
    },
    {
        label: "COLLECTION",
        href: "/products",
    },
    {
        label: "ABOUT",
        href: "/about",
    },
    {
        label: "CONTACT",
        href: "/contact",
    },
];

export default function Navbar() {
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();
    const isLoggedIn = !!session?.user;

    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close menus whenever the route changes
    useEffect(() => {
        setProfileOpen(false);
        setMobileOpen(false);
    }, [pathname]);

    // Prevent body scrolling while mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    };

    return (
        <header className="w-full bg-white">
            {/* Main Navbar */}
            <div className="relative mx-auto w-full max-w-[1587px]">
                <div className="flex h-[96px] items-center justify-between">
                    {/* -------------------------------------------------
              LOGO
          -------------------------------------------------- */}
                    <Link
                        href="/"
                        aria-label="Forever Home"
                        className="flex h-[47px] w-[166px] shrink-0 items-center"
                    >
                        <Image
                            src="/assets/frontend_assets/logo.png"
                            alt="Forever"
                            width={166}
                            height={47}
                            priority
                            className="h-[47px] w-[166px] object-contain"
                        />
                    </Link>
                    {/* -------------------------------------------------
              DESKTOP NAVIGATION
          -------------------------------------------------- */}
                    <nav
                        className="
              absolute
              left-1/2
              top-1/2
              hidden
              h-[36px]
              w-[413px]
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-between
              lg:flex
            "
                    >
                        {navItems.map((item) => {
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="
                    group
                    relative
                    flex
                    h-[36px]
                    items-center
                    justify-center
                    rounded-[10px]
                    px-1
                    text-[18px]
                    font-medium
                    leading-none
                    tracking-[-0.35px]
                    text-[#2A2A2A]
                    transition-colors
                    duration-200
                    hover:text-[#111111]
                  "
                                >
                                    {item.label}

                                    {/* Active underline */}
                                    <span
                                        className={`
                      absolute
                      -bottom-[2px]
                      left-1/2
                      h-[2px]
                      -translate-x-1/2
                      bg-[#2A2A2A]
                      transition-all
                    rounded-[10px]
                      duration-200
                      ${active
                                                ? "w-[59px] opacity-100"
                                                : "w-0 opacity-0"
                                            }
                    `}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* -------------------------------------------------
              RIGHT ICONS
          -------------------------------------------------- */}
                    <div className="hidden h-[47px] items-center gap-[27px] lg:flex">
                        {/* Search */}
                        <button
                            type="button"
                            aria-label="Search"
                            className="
                flex
                h-[36px]
                w-[36px]
                items-center
                justify-center
                text-[#303030]
                transition-transform
                duration-200
                hover:scale-105
              "
                        >
                            <Image
                                src="/assets/frontend_assets/search_icon.png"
                                alt="Search"
                                width={23}
                                height={23}
                                className="h-[23px] w-[23px] object-contain"
                            />
                        </button>

                        {/* Profile */}

                        {!isPending && !isLoggedIn && (
                            <Link
                                href="/login"
                                className="
            flex
            h-[36px]
            items-center
            justify-center
            rounded-[10px]
            px-1
            text-[18px]
            font-medium
            leading-none
            tracking-[-0.35px]
            text-[#2A2A2A]
            transition-colors
            duration-200
            hover:text-[#111111]
        "
                            >
                                LOGIN
                            </Link>
                        )}

                        {!isPending && isLoggedIn && (
                            <>

                                <div className="relative">
                                    <button
                                        type="button"
                                        aria-label="My Profile"
                                        aria-expanded={profileOpen}
                                        onClick={() => setProfileOpen((prev) => !prev)}
                                        className="
                  flex
                  h-[36px]
                  w-[36px]
                  items-center
                  justify-center
                  text-[#303030]
                  transition-transform
                  duration-200
                  hover:scale-105
                "
                                    >
                                        <Image
                                            src="/assets/frontend_assets/profile_icon.png"
                                            alt="Profile"
                                            width={29}
                                            height={25}
                                            className="h-[25px] w-[29px] object-contain"
                                        />
                                    </button>

                                    {/* Profile Dropdown */}
                                    {profileOpen && (
                                        <div
                                            className="
                    absolute
                    right-0
                    top-[54px]
                    z-50
                    h-[140px]
                    w-[218px]
                    rounded-[4px]
                    border
                    border-[#eeeeee]
                    bg-[#fafafa]
                    px-[20px]
                    py-[16px]
                    shadow-[0_1px_6px_rgba(0,0,0,0.04)]
                  "
                                        >
                                            <div className="flex h-full flex-col justify-between">
                                                <Link
                                                    href="/profile"
                                                    className="
                        text-[17px]
                        font-normal
                        leading-[22px]
                        tracking-[-0.2px]
                        text-[#666666]
                        transition-colors
                        hover:text-[#222222]
                      "
                                                >
                                                    My Profile
                                                </Link>

                                                <Link
                                                    href="/orders"
                                                    className="
                        text-[17px]
                        font-normal
                        leading-[22px]
                        tracking-[-0.2px]
                        text-[#666666]
                        transition-colors
                        hover:text-[#222222]
                      "
                                                >
                                                    Orders
                                                </Link>

                                                <button
                                                    onClick={async () => {
                                                        await authClient.signOut();
                                                        setProfileOpen(false);
                                                    }}
                                                    type="button"
                                                    className="
                        w-fit
                        text-left
                        text-[17px]
                        font-normal
                        leading-[22px]
                        tracking-[-0.2px]
                        text-[#666666]
                        transition-colors
                        hover:text-[#222222]
                      "
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>



                                {/* Cart */}

                                <Link
                                    href="/cart"
                                    aria-label="Shopping Bag"
                                    className="
                relative
                flex
                h-[39px]
                w-[39px]
                items-center
                justify-center
                text-[#303030]
                transition-transform
                duration-200
                hover:scale-105
              "
                                >
                                    <Image
                                        src="/assets/frontend_assets/cart_icon.png"
                                        alt="Shopping Bag"
                                        width={22}
                                        height={24}
                                        className="h-[24px] w-[px] object-contain"
                                    />
                                    {/* Cart count */}
                                    <span
                                        className="
                  absolute
                  right-[-1px]
                  top-[18px]
                  flex
                  h-[18px]
                  w-[18px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1e1e1e]
                  text-[11px]
                  font-medium
                  leading-none
                  text-white
                "
                                    >
                                        2
                                    </span>
                                </Link>
                            </>
                        )}


                    </div>

                    {/* -------------------------------------------------
              MOBILE MENU BUTTON
          -------------------------------------------------- */}
                    <button
                        type="button"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="
              flex
              h-[42px]
              w-[42px]
              items-center
              justify-center
              text-[#303030]
              lg:hidden
            "
                    >
                        {mobileOpen ? (
                            <X size={29} strokeWidth={1.7} />
                        ) : (
                            <Menu size={29} strokeWidth={1.7} />
                        )}
                    </button>
                </div>

                {/* -------------------------------------------------
            BOTTOM BORDER
        -------------------------------------------------- */}
                <div className="h-px w-full bg-[#d0d0d0]" />
            </div>

            {/* -------------------------------------------------
          MOBILE MENU
      -------------------------------------------------- */}
            {mobileOpen && (
                <div
                    className="
            fixed
            inset-x-0
            top-[97px]
            z-40
            border-t
            border-[#eeeeee]
            bg-white
            lg:hidden
          "
                >
                    <nav className="flex flex-col px-6 py-7">
                        {navItems.map((item) => {
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                    border-b
                    border-[#eeeeee]
                    py-5
                    text-[17px]
                    font-medium
                    tracking-[-0.2px]
                    ${active
                                            ? "text-[#222222]"
                                            : "text-[#555555]"
                                        }
                  `}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        {!isPending && !isLoggedIn && (
                            <Link
                                href="/login"
                                className="
            border-b
            border-[#eeeeee]
            py-5
            text-[17px]
            font-medium
            tracking-[-0.2px]
            text-[#555555]
            transition-colors
            duration-200
            hover:text-[#222222]
        "
                            >
                                LOGIN
                            </Link>
                        )}

                        {!isPending && isLoggedIn && (
                            <>
                                <Link
                                    href="/orders"
                                    className="
                border-b
                border-[#eeeeee]
                py-5
                text-[17px]
                font-medium
                text-[#555555]
              "
                                >
                                    ORDERS
                                </Link>



                                <Link
                                    href="/cart"
                                    className="
                flex
                items-center
                justify-between
                py-5
                text-[17px]
                font-medium
                text-[#555555]
              "
                                >
                                    <span>CART</span>

                                    <span
                                        className="
                  flex
                  h-[22px]
                  min-w-[22px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1e1e1e]
                  px-1
                  text-[11px]
                  text-white
                "
                                    >
                                        2
                                    </span>
                                </Link>
                            </>
                        )}



                    </nav>
                </div>
            )}
        </header>
    );
}