"use client";

import { FormEvent, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type SearchBarProps = {
    onClose: () => void;
};

export default function SearchBar({
    onClose,
}: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get("search") ?? "";

    const [value, setValue] = useState(currentSearch);

    useEffect(() => {
        setValue(currentSearch);
    }, [currentSearch]);

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const params = new URLSearchParams(
            searchParams.toString(),
        );

        const trimmedValue = value.trim();

        if (trimmedValue) {
            params.set("search", trimmedValue);
        } else {
            params.delete("search");
        }

        const query = params.toString();

        router.push(
            query
                ? `/products?${query}`
                : "/products",
        );
    };

    const handleClose = () => {
        const params = new URLSearchParams(
            searchParams.toString(),
        );

        // Remove only search.
        // Existing category, subCategory and sort remain.
        params.delete("search");

        const query = params.toString();

        router.push(
            query
                ? `/products?${query}`
                : "/products",
        );

        setValue("");

        onClose();
    };

    return (
        <div className="border-b border-[#e5e5e5] bg-white">
            <div className="container mx-auto px-[20px] sm:px-[30px] lg:px-[40px]">
                <form
                    onSubmit={handleSubmit}
                    className="flex h-[64px] items-center gap-[14px]"
                >
                    {/* Search icon */}
                    <Search
                        size={20}
                        strokeWidth={1.5}
                        className="shrink-0 text-[#333]"
                    />

                    {/* Input */}
                    <input
                        type="text"
                        value={value}
                        onChange={(event) =>
                            setValue(event.target.value)
                        }
                        placeholder="Search products..."
                        autoFocus
                        className="
                            h-full
                            flex-1
                            bg-transparent
                            text-[15px]
                            text-[#333]
                            outline-none
                            placeholder:text-[#999]
                        "
                    />

                    {/* Clear input */}
                    {value && (
                        <button
                            type="button"
                            onClick={() => setValue("")}
                            aria-label="Clear search input"
                            className="
                                shrink-0
                                text-[#777]
                                transition-colors
                                hover:text-[#333]
                            "
                        >
                            <X
                                size={18}
                                strokeWidth={1.5}
                            />
                        </button>
                    )}

                    {/* Search */}
                    <button
                        type="submit"
                        className="
                            shrink-0
                            text-[14px]
                            font-medium
                            uppercase
                            tracking-[0.04em]
                            text-[#333]
                            transition-opacity
                            hover:opacity-60
                        "
                    >
                        Search
                    </button>

                    {/* Close search bar */}
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close search"
                        className="
                            shrink-0
                            text-[#333]
                            transition-opacity
                            hover:opacity-60
                        "
                    >
                        <X
                            size={22}
                            strokeWidth={1.5}
                        />
                    </button>
                </form>
            </div>
        </div>
    );
}