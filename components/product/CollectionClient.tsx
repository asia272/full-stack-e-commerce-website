"use client";

import Product from "@/components/product/Product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Title from "../Title";

type ProductItem = {
    id: string;
    name: string;
    price: number;
    image: string[];
};

type Category = "MEN" | "WOMEN" | "CHILDREN";

type SubCategory = "TOPWEAR" | "UPPERWEAR";

type SortOption = "low-high" | "high-low" | "newest";

type CollectionClientProps = {
    products: ProductItem[];
    selectedCategories: Category[];
    selectedSubCategories: SubCategory[];
    selectedSort: SortOption;
    search: string;
};

const categories: {
    label: string;
    value: Category;
}[] = [
        {
            label: "Men",
            value: "MEN",
        },
        {
            label: "Women",
            value: "WOMEN",
        },
        {
            label: "Kids",
            value: "CHILDREN",
        },
    ];

const subCategories: {
    label: string;
    value: SubCategory;
}[] = [
        {
            label: "Topwear",
            value: "TOPWEAR",
        },
        {
            label: "Upperwear",
            value: "UPPERWEAR",
        },
    ];

const sortOptions: {
    label: string;
    value: SortOption;
}[] = [
        {
            label: "Sort by: Price: Low To High",
            value: "low-high",
        },
        {
            label: "Sort by: Price: High To Low",
            value: "high-low",
        },
        {
            label: "Sort by: Newest",
            value: "newest",
        },
    ];

export default function CollectionClient({
    products,
    selectedCategories,
    selectedSubCategories,
    selectedSort,
    search,
}: CollectionClientProps) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const updateFilters = (
        nextCategories: Category[],
        nextSubCategories: SubCategory[],
        nextSort: SortOption = selectedSort,
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (nextCategories.length > 0) {
            params.set("category", nextCategories.join(","));
        } else {
            params.delete("category");
        }

        if (nextSubCategories.length > 0) {
            params.set("subCategory", nextSubCategories.join(","));
        } else {
            params.delete("subCategory");
        }

        if (nextSort !== "newest") {
            params.set("sort", nextSort);
        } else {
            params.delete("sort");
        }

        const query = params.toString();

        router.push(query ? `${pathname}?${query}` : pathname);
    };

    const toggleCategory = (category: Category) => {
        const exists = selectedCategories.includes(category);

        const nextCategories = exists
            ? selectedCategories.filter((item) => item !== category)
            : [...selectedCategories, category];

        updateFilters(
            nextCategories,
            selectedSubCategories,
            selectedSort,
        );
    };

    const toggleSubCategory = (subCategory: SubCategory) => {
        const exists =
            selectedSubCategories.includes(subCategory);

        const nextSubCategories = exists
            ? selectedSubCategories.filter(
                (item) => item !== subCategory,
            )
            : [...selectedSubCategories, subCategory];

        updateFilters(
            selectedCategories,
            nextSubCategories,
            selectedSort,
        );
    };

    const handleSort = (sort: SortOption) => {
        setSortOpen(false);

        updateFilters(
            selectedCategories,
            selectedSubCategories,
            sort,
        );
    };

    const clearFilters = () => {
        const params = new URLSearchParams();

        if (search) {
            params.set("search", search);
        }

        const query = params.toString();

        router.push(
            query ? `${pathname}?${query}` : pathname,
        );
    };

    const currentSortLabel = useMemo(() => {
        return (
            sortOptions.find(
                (option) => option.value === selectedSort,
            )?.label ?? "Sort by: Newest"
        );
    }, [selectedSort]);

    const filterContent = (
        <div className="space-y-[24px]">
            {/* Categories */}
            <div className="border border-[#d8d8d8] px-[25px] py-[20px]">
                <h3 className="mb-[19px] text-[16px] font-medium uppercase leading-[20px] text-[#333]">
                    Categories
                </h3>

                <div className="space-y-[15px]">
                    {categories.map((category) => {
                        const checked =
                            selectedCategories.includes(
                                category.value,
                            );

                        return (
                            <label
                                key={category.value}
                                className="flex cursor-pointer items-center gap-[13px]"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        toggleCategory(
                                            category.value,
                                        )
                                    }
                                    className="
                                        peer
                                        sr-only
                                    "
                                />

                                <span
                                    className={`
                                        flex
                                        h-[22px]
                                        w-[22px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        border
                                        ${checked
                                            ? "border-[#3d3d3d] bg-[#3d3d3d]"
                                            : "border-[#cfcfcf] bg-white"
                                        }
                                    `}
                                >
                                    {checked && (
                                        <span className="h-[7px] w-[11px] rotate-[-45deg] border-b-[2px] border-l-[2px] border-white" />
                                    )}
                                </span>

                                <span className="text-[15px] font-normal leading-[22px] text-[#4a4a4a]">
                                    {category.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Type */}
            <div className="border border-[#d8d8d8] px-[25px] py-[20px]">
                <h3 className="mb-[19px] text-[16px] font-medium uppercase leading-[20px] text-[#333]">
                    Type
                </h3>

                <div className="space-y-[15px]">
                    {subCategories.map((subCategory) => {
                        const checked =
                            selectedSubCategories.includes(
                                subCategory.value,
                            );

                        return (
                            <label
                                key={subCategory.value}
                                className="flex cursor-pointer items-center gap-[13px]"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        toggleSubCategory(
                                            subCategory.value,
                                        )
                                    }
                                    className="sr-only"
                                />

                                <span
                                    className={`
                                        flex
                                        h-[22px]
                                        w-[22px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        border
                                        ${checked
                                            ? "border-[#3d3d3d] bg-[#3d3d3d]"
                                            : "border-[#cfcfcf] bg-white"
                                        }
                                    `}
                                >
                                    {checked && (
                                        <span className="h-[7px] w-[11px] rotate-[-45deg] border-b-[2px] border-l-[2px] border-white" />
                                    )}
                                </span>

                                <span className="text-[15px] font-normal leading-[22px] text-[#4a4a4a]">
                                    {subCategory.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {(selectedCategories.length > 0 ||
                selectedSubCategories.length > 0) && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="
                        flex
                        items-center
                        gap-[7px]
                        text-[14px]
                        font-medium
                        text-[#333]
                        underline
                        underline-offset-4
                    "
                    >
                        <X size={14} strokeWidth={1.5} />
                        Clear filters
                    </button>
                )}
        </div>
    );

    return (
        <main className="min-h-screen px-[20px] pb-[80px] pt-[55px] sm:px-[30px] lg:px-[40px]  container mx-auto">
            <div className="grid grid-cols-1 gap-[35px] lg:grid-cols-[344px_minmax(0,1fr)] lg:gap-[45px]">
                {/* Desktop sidebar */}
                <aside className="hidden lg:block">
                    <h2 className="mb-[17px] text-[23px] font-normal uppercase leading-[28px] text-[#333]">
                        Filters
                    </h2>

                    {filterContent}
                </aside>

                {/* Main content */}
                <section className="min-w-0">
                    {/* Header */}
                    <div className="mb-[34px] flex items-center justify-between gap-[25px]">

                        <Title title="All" highlight="Collections" align="start" className="mb-[2px]" highlightWeight="semibold" />



                        {/* Desktop sort */}
                        <div className="relative hidden w-[310px] shrink-0 lg:block">
                            <button
                                type="button"
                                onClick={() =>
                                    setSortOpen((value) => !value)
                                }
                                className="
                                    flex
                                    h-[56px]
                                    w-full
                                    items-center
                                    justify-between
                                    border
                                    border-[#d4d4d4]
                                    bg-white
                                    px-[17px]
                                    text-left
                                    text-[15px]
                                    font-normal
                                    text-[#444]
                                "
                            >
                                <span>{currentSortLabel}</span>

                                <ChevronDown
                                    size={24}
                                    strokeWidth={1.5}
                                    className={`
                                        transition-transform
                                        duration-200
                                        ${sortOpen
                                            ? "rotate-180"
                                            : ""
                                        }
                                    `}
                                />
                            </button>

                            {sortOpen && (
                                <div className="absolute left-0 right-0 top-[61px] z-30 border border-[#d4d4d4] bg-white shadow-sm">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() =>
                                                handleSort(
                                                    option.value,
                                                )
                                            }
                                            className={`
                                                block
                                                w-full
                                                px-[17px]
                                                py-[13px]
                                                text-left
                                                text-[14px]
                                                ${selectedSort ===
                                                    option.value
                                                    ? "bg-[#f5f5f5] font-medium"
                                                    : "font-normal"
                                                }
                                                text-[#444]
                                                hover:bg-[#f7f7f7]
                                            `}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile controls */}
                    <div className="mb-[25px] flex gap-[10px] lg:hidden">
                        <button
                            type="button"
                            onClick={() =>
                                setMobileFiltersOpen(true)
                            }
                            className="
                                flex
                                h-[50px]
                                flex-1
                                items-center
                                justify-center
                                gap-[8px]
                                border
                                border-[#d4d4d4]
                                text-[14px]
                                uppercase
                                text-[#333]
                            "
                        >
                            <SlidersHorizontal size={17} />
                            Filters
                        </button>

                        <select
                            value={selectedSort}
                            onChange={(event) =>
                                handleSort(
                                    event.target
                                        .value as SortOption,
                                )
                            }
                            className="
                                h-[50px]
                                flex-1
                                border
                                border-[#d4d4d4]
                                bg-white
                                px-[12px]
                                text-[14px]
                                text-[#333]
                                outline-none
                            "
                        >
                            {sortOptions.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label.replace(
                                        "Sort by: ",
                                        "",
                                    )}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Products */}
                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 gap-x-[20px] gap-y-[48px] sm:grid-cols-3 sm:gap-x-[24px] lg:grid-cols-4 lg:gap-x-[30px] lg:gap-y-[50px]">
                            {products.map((product) => (
                                <Product
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[300px] items-center justify-center border border-[#e1e1e1]">
                            <div className="text-center">
                                <h2 className="text-[18px] font-medium text-[#333]">
                                    No products found
                                </h2>

                                <p className="mt-[8px] text-[14px] text-[#777]">
                                    Try changing your filters.
                                </p>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-[18px] text-[14px] font-medium text-[#333] underline underline-offset-4"
                                >
                                    Clear filters
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            {/* Mobile filter drawer */}
            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        aria-label="Close filters"
                        onClick={() =>
                            setMobileFiltersOpen(false)
                        }
                        className="absolute inset-0 bg-black/30"
                    />

                    <div className="absolute right-0 top-0 h-full w-[min(88%,380px)] overflow-y-auto bg-white px-[22px] pb-[35px] pt-[25px]">
                        <div className="mb-[30px] flex items-center justify-between">
                            <h2 className="text-[22px] font-medium uppercase text-[#333]">
                                Filters
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileFiltersOpen(false)
                                }
                                aria-label="Close filters"
                            >
                                <X size={24} strokeWidth={1.5} />
                            </button>
                        </div>

                        {filterContent}
                    </div>
                </div>
            )}
        </main>
    );
}