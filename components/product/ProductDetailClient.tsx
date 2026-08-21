"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { addToCart } from "@/app/actions/cart";

type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

type ProductDetailClientProps = {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string[];
        sizes: ProductSize[];
    };
};

export default function ProductDetailClient({
    product,
}: ProductDetailClientProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] =
        useState<ProductSize | null>(null);

    const [isPending, startTransition] = useTransition();

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Please select a size.");
            return;
        }

        startTransition(async () => {
            const result = await addToCart({
                productId: product.id,
                size: selectedSize,
            });

            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_1fr]">
            {/* LEFT - IMAGES */}
            <div className="flex gap-3">
                {/* THUMBNAILS */}
                <div className="flex w-[70px] shrink-0 flex-col gap-3">
                    {product.image.map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            onClick={() => setSelectedImage(index)}
                            className={`relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5] ${selectedImage === index
                                ? "ring-1 ring-black"
                                : ""
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`${product.name} ${index + 1}`}
                                fill
                                sizes="70px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>

                {/* MAIN IMAGE */}
                <div className="relative aspect-[0.82] flex-1 overflow-hidden bg-[#f5f5f5]">
                    <Image
                        src={product.image[selectedImage]}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 90vw, 50vw"
                        className="object-cover"
                    />
                </div>
            </div>

            {/* RIGHT */}
            <div className="pt-0 lg:pt-1">
                <h1 className="text-[34px] font-medium leading-[1.25] text-[#3D3D3D] sm:text-[25px]">
                    {product.name}
                </h1>

                {/* RATING */}
                <div className="mt-3 flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={14}
                            fill="#ff5b3d"
                            strokeWidth={0}
                        />
                    ))}

                    <span className="ml-1 text-[12px] text-[#333]">
                        (122)
                    </span>
                </div>

                {/* PRICE */}
                <p className="mt-5 text-[32px] font-medium text-[#2A2A2A]">
                    ${product.price.toFixed(0)}
                </p>

                {/* DESCRIPTION */}
                <p className="mt-5 max-w-[560px] text-[16px] leading-6 text-[#555555]">
                    {product.description}
                </p>

                {/* SIZE */}
                <div className="mt-7">
                    <p className="mb-4 text-[20px] font-semibold text-[#656565]">
                        Select Size
                    </p>

                    <div className="flex gap-3">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                type="button"
                                onClick={() =>
                                    setSelectedSize(size)
                                }
                                className={`flex h-10 min-w-10 items-center justify-center border px-3 text-[12px] transition ${selectedSize === size
                                    ? "border-[#ff5b3d] text-black"
                                    : "border-[#e5e5e5] text-[#333] hover:border-black"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ADD TO CART */}
                <button
                    type="button"
                    disabled={isPending}
                    onClick={handleAddToCart}
                    className="mt-7 h-10 min-w-[135px] bg-black px-8 text-[11px] font-semibold text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending ? "ADDING..." : "ADD TO CART"}
                </button>

                {/* PRODUCT INFO */}
                <div className="mt-6 border-t border-[#ddd] pt-4 text-[16px] leading-6 text-[#555555]">
                    <p>100% Original product.</p>
                    <p>Cash on delivery is available on this product.</p>
                    <p>Easy return and exchange policy within 7 days.</p>
                </div>
            </div>
        </div>
    );
}