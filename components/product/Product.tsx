import Image from "next/image";
import Link from "next/link";

type ProductProps = {
    id: string;
    name: string;
    price: number;
    image: string[];
};

export default function Product({
    id,
    name,
    price,
    image,
}: ProductProps) {
    return (
        <Link
            href={`/products/${id}`}
            className="group block"
        >
            <div
                className="
                    relative
                    aspect-[13/15]
                    w-full
                    overflow-hidden
                    bg-[#f3f3f3]
                "
            >
                <Image
                    src={image[0]}
                    alt={name}
                    fill
                    sizes="
                        (max-width: 640px) 50vw,
                        (max-width: 1024px) 33vw,
                        20vw
                    "
                    className="
                        object-cover
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-[1.03]
                    "
                />
            </div>

            <div className="pt-[17px]">
                <h3
                    className="
                        line-clamp-2
                        text-[14px]
                        font-medium
                        leading-[20px]
                        tracking-[-0.15px]
                        text-[#3d3d3d]
                    "
                >
                    {name}
                </h3>

                <p
                    className="
                        mt-[3px]
                        text-[14px]
                        font-medium
                        leading-[20px]
                        tracking-[-0.1px]
                        text-[#3d3d3d]
                    "
                >
                    ${price.toFixed(2)}
                </p>
            </div>
        </Link>
    );
}