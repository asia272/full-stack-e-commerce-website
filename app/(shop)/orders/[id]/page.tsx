import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";

import { getMyOrders } from "@/app/actions/order";
import type {
    Order,
    OrderStatus,
} from "@/components/order/OrderCard";

interface OrderDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const statusLabels: Record<OrderStatus, string> = {
    ORDER_PLACED: "Order Placed",
    PACKING: "Ready to Ship",
    SHIPPED: "Shipped",
    OUT_FOR_DELIVERY: "Out for Delivery",
    DELIVERED: "Delivered",
};

const statusSteps: OrderStatus[] = [
    "ORDER_PLACED",
    "PACKING",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
];

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

function formatPrice(price: number) {
    return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

function getStatusIndex(status: OrderStatus) {
    return statusSteps.indexOf(status);
}

function OrderTimeline({
    status,
}: {
    status: OrderStatus;
}) {
    const currentIndex = getStatusIndex(status);

    return (
        <div className="mt-8">
            <div className="relative">
                {/* LINE */}
                <div
                    className="
                        absolute
                        left-[14px]
                        top-[14px]
                        h-[calc(100%-28px)]
                        w-px
                        bg-[#D8D8D8]
                    "
                />

                <div className="relative space-y-7">
                    {statusSteps.map((step, index) => {
                        const completed =
                            index <= currentIndex;

                        return (
                            <div
                                key={step}
                                className="flex items-start gap-5"
                            >
                                <div
                                    className={`
                                        relative
                                        z-10
                                        flex
                                        h-7
                                        w-7
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        ${completed
                                            ? "border-[#00A63C] bg-[#00A63C]"
                                            : "border-[#CFCFCF] bg-white"
                                        }
                                    `}
                                >
                                    {completed && (
                                        <Check
                                            className="h-4 w-4 text-white"
                                            strokeWidth={2}
                                        />
                                    )}
                                </div>

                                <div className="pt-0.5">
                                    <p
                                        className={`
                                            text-[15px]
                                            ${completed
                                                ? "font-medium text-[#333333]"
                                                : "text-[#999999]"
                                            }
                                        `}
                                    >
                                        {statusLabels[step]}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default async function OrderDetailsPage({
    params,
}: OrderDetailsPageProps) {
    const { id } = await params;

    const result = await getMyOrders();

    if (!result.success) {
        return (
            <main className="min-h-screen bg-white px-5 py-16">
                <div className="mx-auto max-w-[1200px]">
                    <p className="text-sm text-[#777777]">
                        {result.message}
                    </p>
                </div>
            </main>
        );
    }

    const order = result.orders.find(
        (item: Order) => item.id === id
    );

    if (!order) {
        return (
            <main className="min-h-screen bg-white">
                <div
                    className="
                        mx-auto
                        max-w-[1200px]
                        px-5
                        py-16
                        sm:px-8
                    "
                >
                    <Link
                        href="/orders"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            text-[#555555]
                            hover:text-black
                        "
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to Orders
                    </Link>

                    <h1 className="mt-12 text-3xl font-medium text-[#333333]">
                        Order not found
                    </h1>

                    <p className="mt-3 text-sm text-[#777777]">
                        We couldn't find this order in your account.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <div
                className="
                    mx-auto
                    w-full
                    max-w-[1400px]
                    px-5
                    py-12
                    sm:px-8
                    lg:px-10
                    lg:py-16
                "
            >
                {/* BACK */}
                <Link
                    href="/orders"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        text-[15px]
                        text-[#555555]
                        transition-colors
                        hover:text-black
                    "
                >
                    <ChevronLeft
                        className="h-4 w-4"
                        strokeWidth={1.5}
                    />
                    Back to Orders
                </Link>

                {/* HEADER */}
                <div
                    className="
                        mt-8
                        flex
                        flex-col
                        gap-4
                        border-b
                        border-[#D9D9D9]
                        pb-7
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    "
                >
                    <div>
                        <div className="flex items-center gap-3">
                            <h1
                                className="
                                    text-[28px]
                                    font-medium
                                    text-[#707070]
                                "
                            >
                                ORDER
                            </h1>

                            <h1
                                className="
                                    text-[28px]
                                    font-semibold
                                    text-[#303030]
                                "
                            >
                                DETAILS
                            </h1>

                            <span className="ml-1 h-[2px] w-[45px] bg-[#444444]" />
                        </div>

                        <p className="mt-4 text-sm text-[#777777]">
                            Order #{order.id}
                        </p>
                    </div>

                    <div className="text-left sm:text-right">
                        <p className="text-xs uppercase tracking-[0.12em] text-[#999999]">
                            Order Date
                        </p>

                        <p className="mt-1 text-[15px] text-[#444444]">
                            {formatDate(order.createdAt)}
                        </p>
                    </div>
                </div>

                {/* CONTENT */}
                <div
                    className="
                        mt-10
                        grid
                        grid-cols-1
                        gap-10
                        lg:grid-cols-[minmax(0,1fr)_340px]
                    "
                >
                    {/* PRODUCTS */}
                    <section>
                        <h2 className="text-[20px] font-medium text-[#333333]">
                            Items
                        </h2>

                        <div className="mt-5 border-t border-[#D9D9D9]">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="
                                        flex
                                        gap-5
                                        border-b
                                        border-[#D9D9D9]
                                        py-6
                                    "
                                >
                                    <div
                                        className="
                                            relative
                                            h-[120px]
                                            w-[105px]
                                            shrink-0
                                            overflow-hidden
                                            bg-[#EEEEEE]
                                        "
                                    >
                                        <Image
                                            src={
                                                item.product
                                                    .image[0]
                                            }
                                            alt={
                                                item.product
                                                    .name
                                            }
                                            fill
                                            sizes="105px"
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <Link
                                            href={`/products/${item.product.id}`}
                                            className="
                                                text-[17px]
                                                font-medium
                                                text-[#444444]
                                                hover:opacity-60
                                            "
                                        >
                                            {item.product.name}
                                        </Link>

                                        <div className="mt-4 space-y-2 text-sm text-[#666666]">
                                            <p>
                                                Quantity:{" "}
                                                <span className="text-[#333333]">
                                                    {item.quantity}
                                                </span>
                                            </p>

                                            <p>
                                                Size:{" "}
                                                <span className="text-[#333333]">
                                                    {item.size}
                                                </span>
                                            </p>

                                            <p>
                                                Price:{" "}
                                                <span className="text-[#333333]">
                                                    {formatPrice(
                                                        item.price
                                                    )}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* SUMMARY */}
                        <div className="mt-7 ml-auto max-w-[360px]">
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-[#777777]">
                                    <span>Subtotal</span>
                                    <span>
                                        {formatPrice(
                                            order.subtotal
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between text-[#777777]">
                                    <span>Shipping</span>
                                    <span>
                                        {formatPrice(
                                            order.shippingCost
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between border-t border-[#D9D9D9] pt-4 text-[17px] font-medium text-[#333333]">
                                    <span>Total</span>
                                    <span>
                                        {formatPrice(
                                            order.total
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* TRACKING */}
                    <aside
                        className="
                            h-fit
                            border
                            border-[#D9D9D9]
                            p-6
                        "
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-[20px] font-medium text-[#333333]">
                                Track Order
                            </h2>

                            <span className="flex items-center gap-2 text-sm text-[#444444]">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#00A63C]" />
                                {statusLabels[order.status]}
                            </span>
                        </div>

                        <OrderTimeline
                            status={order.status}
                        />

                        <div className="mt-9 border-t border-[#E2E2E2] pt-5">
                            <p className="text-xs uppercase tracking-[0.1em] text-[#999999]">
                                Payment
                            </p>

                            <p className="mt-2 text-sm text-[#444444]">
                                {order.paymentStatus}
                            </p>

                            <p className="mt-1 text-sm text-[#666666]">
                                {order.paymentMethod}
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}