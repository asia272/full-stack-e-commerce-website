import prisma from "@/lib/prisma";
import Product from "@/components/product/Product";
import Title from "../Title";

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
            <Title title="RELATED" highlight="PRODUCTS" highlightWeight="semibold" />

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