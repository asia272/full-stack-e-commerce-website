import prisma from "@/lib/prisma";
import Product from "@/components/product/Product";

type RelatedProductsProps = {
    productId: string;
    category: "MEN" | "WOMEN" | "CHILDREN";
};

export default async function RelatedProducts({
    productId,
    category,
}: RelatedProductsProps) {
    const products = await prisma.product.findMany({
        where: {
            id: {
                not: productId,
            },
            category,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
        select: {
            id: true,
            name: true,
            price: true,
            image: true,
        },
    });

    if (products.length === 0) {
        return null;
    }

    const serializedProducts = products.map((product) => ({
        ...product,
        price: Number(product.price),
    }));

    return (
        <section className="mt-[100px]">
            <div className="mb-10 flex items-center justify-center gap-4">
                <h2 className="text-[24px] font-light uppercase text-[#777]">
                    Related{" "}
                    <span className="font-semibold text-[#333]">
                        Products
                    </span>
                </h2>

                <span className="h-px w-8 bg-[#333]" />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                {serializedProducts.map((product) => (

                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />

                ))}
            </div>
        </section>
    );
}