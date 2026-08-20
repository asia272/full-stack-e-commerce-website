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
        <div className="w-full border-b border-[#eeeeee] bg-[#fcfdfe]">
            <div className="mx-auto flex h-[132px] w-full items-center justify-center px-[20px] sm:px-[30px]">
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-[1050px] items-center gap-[20px]"
                >
                    {/* Search field */}
                    <div
                        className="
                            flex
                            h-[61px]
                            flex-1
                            items-center
                            rounded-[32px]
                            border
                            border-[#bfc1c3]
                            bg-[#fcfdfe]
                            px-[31px]
                            transition-colors
                            focus-within:border-[#999]
                        "
                    >
                        {/* Input */}
                        <input
                            type="text"
                            value={value}
                            onChange={(event) =>
                                setValue(event.target.value)
                            }
                            placeholder="Search"
                            autoFocus
                            className="
                                min-w-0
                                flex-1
                                bg-transparent
                                text-[20px]
                                font-normal
                                leading-none
                                text-[#333]
                                outline-none
                                placeholder:text-[#b8b8b8]
                            "
                        />

                        {/* Search icon */}
                        <button
                            type="submit"
                            aria-label="Search"
                            className="
                                ml-[20px]
                                flex
                                h-[32px]
                                w-[32px]
                                shrink-0
                                items-center
                                justify-center
                                text-[#333]
                                transition-opacity
                                hover:opacity-60
                            "
                        >
                            <Search
                                size={29}
                                strokeWidth={1.6}
                            />
                        </button>
                    </div>

                    {/* Close search bar */}
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close search"
                        className="
                            flex
                            h-[32px]
                            w-[32px]
                            shrink-0
                            items-center
                            justify-center
                            text-[#333]
                            transition-opacity
                            hover:opacity-60
                        "
                    >
                        <X
                            size={28}
                            strokeWidth={1.5}
                        />
                    </button>
                </form>
            </div>
        </div>
    );
}