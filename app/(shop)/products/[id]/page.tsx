import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import RelatedProducts from "@/components/product/RelatedProducts";

type ProductPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProductPage({
    params,
}: ProductPageProps) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            description: true,
            category: true,
            price: true,
            sizes: true,
            image: true,
        },
    });

    if (!product) {
        notFound();
    }

    const serializedProduct = {
        ...product,
        price: Number(product.price),
    };

    return (
        <main className="mx-auto w-full max-w-[1280px] px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-10">
            <ProductDetailClient
                product={serializedProduct}
            />

            {/* DESCRIPTION / REVIEWS */}
            <section className="mt-[100px]">
                <div className="flex">
                    <button
                        type="button"
                        className="border border-[#ddd] border-b-0 px-6 py-4 text-[13px] font-semibold text-[#333]"
                    >
                        Description
                    </button>

                    <button
                        type="button"
                        className="border-b border-[#ddd] px-6 py-4 text-[13px] font-medium text-[#999]"
                    >
                        Reviews (122)
                    </button>
                </div>

                <div className="border border-[#ddd] px-8 py-8 sm:px-10 sm:py-10">
                    <p className="max-w-[1100px] text-[12px] leading-6 text-[#666]">
                        {product.description}
                    </p>

                    <p className="mt-4 max-w-[1100px] text-[15px] leading-6 text-[#666]">
                        This product is made with high-quality materials
                        and designed for everyday comfort and style.
                    </p>
                </div>
            </section>

            {/* RELATED PRODUCTS */}
            <RelatedProducts
                productId={product.id}
                category={product.category}
            />
        </main>
    );
}