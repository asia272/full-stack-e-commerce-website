import Image from "next/image";

import { getAllProducts } from "@/app/actions/product";

export default async function AdminListItemsPage() {
    const products = await getAllProducts();

    return (
        <div className="w-full">
            {/* Page Title */}
            <h1 className="mb-4 text-[18px] font-normal text-[#333]">
                All Products List
            </h1>

            {/* Products Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                    {/* Table Header */}
                    <thead>
                        <tr className="h-[42px] bg-[#f5f5f5] text-left">
                            <th className="w-[170px] px-[12px] text-[14px] font-semibold text-[#333]">
                                Image
                            </th>

                            <th className="px-[12px] text-[14px] font-semibold text-[#333]">
                                Name
                            </th>

                            <th className="w-[175px] px-[12px] text-[14px] font-semibold text-[#333]">
                                Category
                            </th>

                            <th className="w-[180px] px-[12px] text-[14px] font-semibold text-[#333]">
                                Price
                            </th>

                            <th className="w-[100px] px-[12px] text-[14px] font-semibold text-[#333]">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="h-[82px] border-b border-[#e8e8e8]"
                            >
                                {/* Image */}
                                <td className="px-[12px]">
                                    <div className="relative h-[60px] w-[60px] overflow-hidden bg-[#f7f7f7]">
                                        {product.image?.[0] ? (
                                            <Image
                                                src={product.image[0]}
                                                alt={product.name}

                                                sizes="60px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-[11px] text-[#999]">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                </td>

                                {/* Name */}
                                <td className="px-[12px] text-[15px] font-normal text-[#555]">
                                    {product.name}
                                </td>

                                {/* Category */}
                                <td className="px-[12px] text-[15px] font-normal text-[#555]">
                                    {product.category === "CHILDREN"
                                        ? "Kids"
                                        : product.category.charAt(0) +
                                        product.category.slice(1).toLowerCase()}
                                </td>

                                {/* Price */}
                                <td className="px-[12px] text-[15px] font-normal text-[#555]">
                                    ${product.price}
                                </td>

                                {/* Action */}
                                <td className="px-[12px]">
                                    <button
                                        type="button"
                                        aria-label={`Delete ${product.name}`}
                                        className="text-[24px] font-light leading-none text-[#555] transition-colors hover:text-black"
                                    >
                                        ×
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {products.length === 0 && (
                    <div className="flex h-[180px] items-center justify-center border-b border-[#e8e8e8] text-[14px] text-[#777]">
                        No products found.
                    </div>
                )}
            </div>
        </div>
    );
}