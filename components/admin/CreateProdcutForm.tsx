"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { createProduct } from "@/app/actions/product";
import { toast } from "sonner";

const categories = [
    "MEN",
    "WOMEN",
    "CHILDREN",
];

const subCategories = [
    "TOPWEAR",
    "UPPERWEAR"
];

const sizes = [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
];

type ProductFormState = {
    name: string;
    description: string;
    category: string;
    subCategory: string;
    price: string;
    sizes: string[];
    isBestSeller: boolean
};

const initialForm: ProductFormState = {
    name: "",
    description: "",
    category: "MEN",
    subCategory: "TOPWEAR",
    price: "",
    sizes: [],
    isBestSeller: false
};

export default function CreateProductForm() {
    const [form, setForm] = useState<ProductFormState>(initialForm);

    const [images, setImages] = useState<
        (File | null)[]
    >([null, null, null, null]);

    const [previews, setPreviews] = useState<
        (string | null)[]
    >([null, null, null, null]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleImageChange = (
        index: number,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const newImages = [...images];
        newImages[index] = file;

        setImages(newImages);

        const newPreviews = [...previews];

        if (newPreviews[index]) {
            URL.revokeObjectURL(newPreviews[index]!);
        }

        newPreviews[index] = URL.createObjectURL(file);

        setPreviews(newPreviews);
    };

    const toggleSize = (size: string) => {
        setForm((previous) => {
            const alreadySelected =
                previous.sizes.includes(size);

            return {
                ...previous,
                sizes: alreadySelected
                    ? previous.sizes.filter(
                        (item) => item !== size
                    )
                    : [...previous.sizes, size],
            };
        });
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setIsSubmitting(true);

        try {
            // ============================================
            // 1. GET SELECTED IMAGES
            // ============================================

            const selectedImages = images.filter(
                (image): image is File => image !== null
            );

            // if (selectedImages.length === 0) {
            //     throw new Error("Please upload at least one image");
            // }

            // ============================================
            // 2. UPLOAD IMAGES TO CLOUDINARY
            // ============================================

            const imageUrls = await Promise.all(
                selectedImages.map((image) =>
                    uploadToCloudinary(image)
                )
            );

            console.log("Cloudinary image URLs:", imageUrls);

            // ============================================
            // 3. CREATE PRODUCT IN DATABASE
            // ============================================

            await createProduct({
                name: form.name,
                description: form.description,
                category: form.category as "MEN" | "WOMEN" | "CHILDREN",
                subCategory: form.subCategory as "TOPWEAR" | "UPPERWEAR",
                price: form.price,
                sizes: form.sizes as ("S" | "M" | "L" | "XL" | "XXL")[],
                isBestSeller: form.isBestSeller,
                image: imageUrls,
            });


            // ============================================
            // 4. SUCCESS
            // ============================================

            toast.success("Product added successfully!");

            // ============================================
            // 5. RESET FORM
            // ============================================

            setForm(initialForm);

            setImages([null, null, null, null]);

            previews.forEach((preview) => {
                if (preview) {
                    URL.revokeObjectURL(preview);
                }
            });

            setPreviews([null, null, null, null]);


        } catch (error) {
            console.error("Create product error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to create product"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                w-full
                max-w-[580px]
            "
        >
            {/* ==================================================
                UPLOAD IMAGE
            =================================================== */}
            <div className="mb-[18px]">
                <label
                    className="
                        mb-[10px]
                        block
                        text-[18px]
                        font-normal
                        leading-none
                        text-[#454545]
                    "
                >
                    Upload Image
                </label>

                <div className="flex flex-wrap gap-[8px]">
                    {images.map((_, index) => (
                        <label
                            key={index}
                            className="
                                relative
                                flex
                                h-[94px]
                                w-[94px]
                                cursor-pointer
                                items-center
                                justify-center
                                border
                                border-dashed
                                border-[#d7dce1]
                                bg-[#fafbfc]
                                transition-colors
                                hover:bg-white
                            "
                        >
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) =>
                                    handleImageChange(
                                        index,
                                        event
                                    )
                                }
                            />

                            {previews[index] ? (
                                <Image
                                    src={previews[index]!}
                                    alt={`Product image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 16V3"
                                            stroke="#c9cfd6"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M7 8L12 3L17 8"
                                            stroke="#c9cfd6"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4 14V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V14"
                                            stroke="#c9cfd6"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    <span
                                        className="
                                            mt-[4px]
                                            text-[14px]
                                            text-[#aeb4bc]
                                        "
                                    >
                                        Upload
                                    </span>
                                </div>
                            )}
                        </label>
                    ))}
                </div>
            </div>

            {/* ==================================================
                PRODUCT NAME
            =================================================== */}
            <div className="mb-[17px]">
                <label
                    htmlFor="product-name"
                    className="
                        mb-[10px]
                        block
                        text-[18px]
                        font-normal
                        leading-none
                        text-[#454545]
                    "
                >
                    Product name
                </label>

                <input
                    id="product-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Type here"
                    required
                    className="
                        h-[49px]
                        w-full
                        rounded-[4px]
                        border
                        border-[#d4d9de]
                        bg-white
                        px-[14px]
                        text-[17px]
                        text-[#444]
                        outline-none
                        transition
                        placeholder:text-[#aeb3b9]
                        focus:border-[#a9afb7]
                        focus:ring-1
                        focus:ring-[#e2e5e8]
                    "
                />
            </div>

            {/* ==================================================
                PRODUCT DESCRIPTION
            =================================================== */}
            <div className="mb-[24px]">
                <label
                    htmlFor="product-description"
                    className="
                        mb-[10px]
                        block
                        text-[18px]
                        font-normal
                        leading-none
                        text-[#454545]
                    "
                >
                    Product description
                </label>

                <textarea
                    id="product-description"
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="Write content here"
                    required
                    rows={3}
                    className="
                        min-h-[76px]
                        w-full
                        resize-y
                        rounded-[4px]
                        border
                        border-[#d4d9de]
                        bg-white
                        px-[14px]
                        py-[12px]
                        text-[17px]
                        leading-[1.4]
                        text-[#444]
                        outline-none
                        transition
                        placeholder:text-[#aeb3b9]
                        focus:border-[#a9afb7]
                        focus:ring-1
                        focus:ring-[#e2e5e8]
                    "
                />
            </div>

            {/* ==================================================
                CATEGORY / SUBCATEGORY / PRICE
            =================================================== */}
            <div
                className="
                    mb-[20px]
                    grid
                    grid-cols-1
                    gap-[18px]
                    sm:grid-cols-[1fr_1fr_140px]
                "
            >
                {/* Category */}
                <div>
                    <label
                        htmlFor="category"
                        className="
                            mb-[10px]
                            block
                            text-[18px]
                            font-normal
                            leading-none
                            text-[#454545]
                        "
                    >
                        Product category
                    </label>

                    <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                        className="
                            h-[48px]
                            w-full
                            rounded-[4px]
                            border
                            border-[#d4d9de]
                            bg-white
                            px-[14px]
                            text-[17px]
                            text-[#555]
                            outline-none
                            focus:border-[#a9afb7]
                        "
                    >
                        {categories.map((category) => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sub category */}
                <div>
                    <label
                        htmlFor="sub-category"
                        className="
                            mb-[10px]
                            block
                            text-[18px]
                            font-normal
                            leading-none
                            text-[#454545]
                        "
                    >
                        Sub category
                    </label>

                    <select
                        id="sub-category"
                        name="subCategory"
                        value={form.subCategory}
                        onChange={handleInputChange}
                        className="
                            h-[48px]
                            w-full
                            rounded-[4px]
                            border
                            border-[#d4d9de]
                            bg-white
                            px-[14px]
                            text-[17px]
                            text-[#555]
                            outline-none
                            focus:border-[#a9afb7]
                        "
                    >
                        {subCategories.map(
                            (subCategory) => (
                                <option
                                    key={subCategory}
                                    value={subCategory}
                                >
                                    {subCategory}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label
                        htmlFor="price"
                        className="
                            mb-[10px]
                            block
                            text-[18px]
                            font-normal
                            leading-none
                            text-[#454545]
                        "
                    >
                        Product Price
                    </label>

                    <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={handleInputChange}
                        placeholder="25"
                        required
                        className="
                            h-[48px]
                            w-full
                            rounded-[4px]
                            border
                            border-[#d4d9de]
                            bg-white
                            px-[14px]
                            text-[17px]
                            text-[#555]
                            outline-none
                            placeholder:text-[#aeb3b9]
                            focus:border-[#a9afb7]
                        "
                    />
                </div>
            </div>

            {/* ==================================================
                PRODUCT SIZES
            =================================================== */}
            <div className="mb-[24px]">
                <label
                    className="
                        mb-[10px]
                        block
                        text-[18px]
                        font-normal
                        leading-none
                        text-[#454545]
                    "
                >
                    Product Sizes
                </label>

                <div className="flex flex-wrap gap-[10px]">
                    {sizes.map((size) => {
                        const selected =
                            form.sizes.includes(size);

                        return (
                            <button
                                key={size}
                                type="button"
                                onClick={() =>
                                    toggleSize(size)
                                }
                                className={`
                                    flex
                                    h-[37px]
                                    min-w-[39px]
                                    items-center
                                    justify-center
                                    px-[10px]
                                    text-[16px]
                                    font-normal
                                    transition-colors
                                    ${selected
                                        ? "bg-[#dfe4e9] text-[#333]"
                                        : "bg-[#edf0f3] text-[#626871] hover:bg-[#e1e5e9]"
                                    }
                                `}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ==================================================
                BESTSELLER
            =================================================== */}
            <label
                className="
                    mb-[31px]
                    flex
                    cursor-pointer
                    items-center
                    gap-[9px]
                    text-[17px]
                    text-[#555]
                "
            >
                <input
                    type="checkbox"
                    checked={form.isBestSeller}
                    onChange={(event) =>
                        setForm((previous) => ({
                            ...previous,
                            isBestSeller: event.target.checked
                        }))
                    }
                    className="
                        h-[15px]
                        w-[15px]
                        cursor-pointer
                        accent-[#555]
                    "
                />

                <span>Add to bestseller</span>
            </label>

            {/* ==================================================
                ADD BUTTON
            =================================================== */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="
                    flex
                    h-[57px]
                    min-w-[130px]
                    items-center
                    justify-center
                    bg-black
                    px-[28px]
                    text-[17px]
                    font-normal
                    tracking-[-0.2px]
                    text-white
                    transition-opacity
                    duration-200
                    hover:opacity-80
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                {isSubmitting ? "ADDING..." : "ADD"}
            </button>
        </form>
    );
}