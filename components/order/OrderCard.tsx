import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type OrderStatus =
    | "ORDER_PLACED"
    | "PACKING"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED";

export type OrderItem = {
    id: string;
    quantity: number;
    size: string;
    price: number;

    product: {
        id: string;
        name: string;
        image: string[];
    };
};

export type Order = {
    id: string;
    status: OrderStatus;
    paymentStatus: string;
    paymentMethod: string;
    subtotal: number;
    shippingCost: number;
    total: number;
    createdAt: string;
    items: OrderItem[];
};

interface OrderCardProps {
    order: Order;
}

const statusLabels: Record<OrderStatus, string> = {
    ORDER_PLACED: "Order Placed",
    PACKING: "Ready to ship",
    SHIPPED: "Shipped",
    OUT_FOR_DELIVERY: "Out for delivery",
    DELIVERED: "Delivered",
};

function formatDate(date: string) {
    const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));

    const [month, day, year] = formatted.split(" ");

    return `${parseInt(day.replace(",", ""), 10)}, ${month}, ${year}`;
}

function formatPrice(price: number) {
    return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

function StatusBadge({ status }: { status: OrderStatus }) {
    return (
        <div className="flex items-center gap-2.5">
            <span className="h-3 w-3 shrink-0 rounded-full bg-[#00A63C]" />

            <span className="text-[16px] font-normal leading-none text-[#444444]">
                {statusLabels[status]}
            </span>
        </div>
    );
}

export default function OrderCard({ order }: OrderCardProps) {
    const firstItem = order.items[0];

    if (!firstItem) {
        return null;
    }

    return (
        <article
            className="
                border-t border-[#D9D9D9]
                last:border-b
            "
        >
            <div
                className="
                    grid
                    grid-cols-1
                    gap-7
                    py-5

                    md:grid-cols-[minmax(0,1fr)_220px_175px]
                    md:items-center
                    md:gap-8
                    md:py-5

                    lg:grid-cols-[minmax(0,1fr)_300px_175px]
                    lg:gap-10

                    xl:grid-cols-[minmax(0,1fr)_350px_175px]
                "
            >
                {/* =========================================
                    PRODUCT
                ========================================== */}
                <div className="flex min-w-0 gap-5">
                    {/* PRODUCT IMAGE */}
                    <Link
                        href={`/products/${firstItem.product.id}`}
                        className="
                            relative
                            h-[128px]
                            w-[112px]
                            shrink-0
                            overflow-hidden
                            bg-[#EEEEEE]
                        "
                    >
                        <Image
                            src={firstItem.product.image[0]}
                            alt={firstItem.product.name}
                            fill
                            sizes="112px"
                            className="object-cover"
                        />
                    </Link>

                    {/* PRODUCT INFORMATION */}
                    <div className="min-w-0 pt-1">
                        <Link
                            href={`/products/${firstItem.product.id}`}
                            className="
                                block
                                max-w-[500px]
                                text-[18px]
                                font-medium
                                leading-[1.35]
                                text-[#444444]
                                transition-opacity
                                hover:opacity-65
                            "
                        >
                            {firstItem.product.name}
                        </Link>

                        <div
                            className="
                                mt-4
                                flex
                                flex-wrap
                                items-center
                                gap-x-5
                                gap-y-2
                                text-[16px]
                                leading-none
                                text-[#444444]
                            "
                        >
                            <span>
                                {formatPrice(firstItem.price)}
                            </span>

                            <span>
                                Quantity: {firstItem.quantity}
                            </span>

                            <span>
                                Size: {firstItem.size}
                            </span>
                        </div>

                        <p
                            className="
                                mt-8
                                text-[16px]
                                leading-none
                                text-[#555555]
                            "
                        >
                            Date: {formatDate(order.createdAt)}
                        </p>
                    </div>
                </div>

                {/* =========================================
                    STATUS
                ========================================== */}
                <div className="flex items-center md:justify-start">
                    <StatusBadge status={order.status} />
                </div>

                {/* =========================================
                    TRACK ORDER
                ========================================== */}
                <div className="flex md:justify-end">
                    <Link
                        href={`/orders/${order.id}`}
                        className="
                            flex
                            h-[48px]
                            w-full
                            max-w-[175px]
                            items-center
                            justify-center
                            border
                            border-[#BDBDBD]
                            bg-white
                            px-5
                            text-[16px]
                            font-normal
                            text-[#444444]
                            transition-all
                            duration-200
                            hover:border-[#444444]
                            hover:bg-[#444444]
                            hover:text-white
                        "
                    >
                        Track Order
                    </Link>
                </div>
            </div>
        </article>
    );
}