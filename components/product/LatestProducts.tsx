
import { getLatestProducts } from "@/app/actions/product";
import Product from "./Product";

export default async function LatestProducts() {
    const products = await getLatestProducts();

    return (
        <section className="w-full">
            {/* Section Header */}
            <div
                className="
                    mb-[42px]
                    flex
                    flex-col
                    items-center
                    text-center
                "
            >
                {/* Title */}
                <h2
                    className="
                        flex
                        items-center
                        gap-[10px]
                        text-[30px]
                        font-normal
                        leading-[36px]
                        tracking-[-0.8px]
                        text-[#6b6b6b]
                    "
                >
                    <span>LATEST</span>

                    <span className="font-semibold text-[#303030]">
                        COLLECTIONS
                    </span>

                    <span
                        className="
                            ml-[1px]
                            mt-[4px]
                            block
                            h-[1px]
                            w-[48px]
                            bg-[#303030]
                        "
                    />
                </h2>

                {/* Description */}
                <p
                    className="
                        mt-[13px]
                        max-w-[850px]
                        text-[14px]
                        font-normal
                        leading-[22px]
                        tracking-[-0.1px]
                        text-[#8a8a8a]
                    "
                >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>

            {/* Products */}
            <div
                className="
                    grid
                    grid-cols-2
                    gap-x-[18px]
                    gap-y-[40px]

                    sm:grid-cols-3
                    sm:gap-x-[20px]

                    lg:grid-cols-4
                    lg:gap-x-[24px]
                    lg:gap-y-[50px]

                    xl:grid-cols-5
                    xl:gap-x-[28px]
                    xl:gap-y-[54px]
                "
            >
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
        </section>
    );
}