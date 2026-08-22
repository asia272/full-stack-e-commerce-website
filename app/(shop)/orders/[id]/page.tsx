import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";

import { getOrderById } from "@/app/actions/order";
import type { OrderStatus } from "@/components/order/OrderCard";
import Title from "@/components/Title";

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
                {/* VERTICAL LINE */}
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
                        const completed = index <= currentIndex;

                        return (
                            <div
                                key={step}
                                className="flex items-start gap-5"
                            >
                                {/* STEP CIRCLE */}
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

                                {/* STEP TEXT */}
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

    /*
     * GET ONLY THIS ORDER
     *
     * The server action also verifies that
     * the order belongs to the authenticated user.
     */
    const result = await getOrderById(id);

    /*
     * ERROR
     */
    if (!result.success || !result.order) {
        return (
            <main className="min-h-screen bg-white">
                <div
                    className="
                        mx-auto
                        w-full
                        max-w-[1200px]
                        px-5
                        py-14
                        sm:px-8
                        lg:px-10
                        lg:py-16
                    "
                >
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

                    <div className="mt-16">
                        <h1 className="text-[28px] font-medium text-[#333333]">
                            Order not found
                        </h1>

                        <p className="mt-3 text-[15px] text-[#777777]">
                            {result.message}
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    const order = result.order;

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
                {/* =========================================
                    BACK TO ORDERS
                ========================================== */}

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

                {/* =========================================
                    PAGE HEADER
                ========================================== */}

                <div
                    className="
                        mt-8
                        flex
                        flex-col
                        gap-5
                        border-b
                        border-[#D9D9D9]
                        pb-7
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    "
                >
                    <div>
                        {/* <div className="flex items-center gap-3">
                            <h1
                                className="
                                    text-[28px]
                                    font-medium
                                    leading-none
                                    tracking-[-0.5px]
                                    text-[#707070]
                                "
                            >
                                ORDER
                            </h1>

                            <h1
                                className="
                                    text-[28px]
                                    font-semibold
                                    leading-none
                                    tracking-[-0.5px]
                                    text-[#303030]
                                "
                            >
                                DETAILS
                            </h1>

                            <span
                                className="
                                    ml-1
                                    mt-1
                                    h-[2px]
                                    w-[45px]
                                    bg-[#444444]
                                "
                            />
                        </div> */}
                        <Title title=" ORDER" highlight=" DETAILS" align="start" highlightWeight="semibold" className="mb-0" />

                        <p className="mt-4 text-[14px] text-[#777777]">
                            Order #{order.id}
                        </p>
                    </div>

                    <div className="text-left sm:text-right">
                        <p
                            className="
                                text-[11px]
                                uppercase
                                tracking-[0.12em]
                                text-[#999999]
                            "
                        >
                            Order Date
                        </p>

                        <p className="mt-1 text-[15px] text-[#444444]">
                            {formatDate(order.createdAt)}
                        </p>
                    </div>
                </div>

                {/* =========================================
                    MAIN CONTENT
                ========================================== */}

                <div
                    className="
                        mt-10
                        grid
                        grid-cols-1
                        gap-10
                        lg:grid-cols-[minmax(0,1fr)_340px]
                    "
                >
                    {/* =====================================
                        LEFT
                        ORDER ITEMS
                    ====================================== */}

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
                                    {/* IMAGE */}

                                    <Link
                                        href={`/products/${item.product.id}`}
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
                                                item.product.image[0]
                                            }
                                            alt={
                                                item.product.name
                                            }
                                            fill
                                            sizes="105px"
                                            className="object-cover"
                                        />
                                    </Link>

                                    {/* PRODUCT INFO */}

                                    <div className="min-w-0 flex-1">
                                        <Link
                                            href={`/products/${item.product.id}`}
                                            className="
                                                block
                                                text-[17px]
                                                font-medium
                                                leading-[1.4]
                                                text-[#444444]
                                                transition-opacity
                                                hover:opacity-60
                                            "
                                        >
                                            {item.product.name}
                                        </Link>

                                        <div className="mt-4 space-y-2 text-[14px] text-[#666666]">
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

                        {/* =====================================
                            ORDER SUMMARY
                        ====================================== */}

                        <div className="mt-7 ml-auto max-w-[360px]">
                            <div className="space-y-3 text-[14px]">
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

                                <div
                                    className="
                                        flex
                                        justify-between
                                        border-t
                                        border-[#D9D9D9]
                                        pt-4
                                        text-[17px]
                                        font-medium
                                        text-[#333333]
                                    "
                                >
                                    <span>Total</span>

                                    <span>
                                        {formatPrice(
                                            order.total
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* =====================================
                            DELIVERY INFORMATION
                        ====================================== */}

                        {order.deliveryInfo && (
                            <div className="mt-12 border-t border-[#D9D9D9] pt-7">
                                <h2 className="text-[20px] font-medium text-[#333333]">
                                    Delivery Information
                                </h2>

                                <div
                                    className="
                                        mt-5
                                        grid
                                        grid-cols-1
                                        gap-x-10
                                        gap-y-5
                                        text-[14px]
                                        sm:grid-cols-2
                                    "
                                >
                                    <div>
                                        <p className="text-[11px] uppercase tracking-[0.1em] text-[#999999]">
                                            Name
                                        </p>

                                        <p className="mt-1 text-[#444444]">
                                            {
                                                order
                                                    .deliveryInfo
                                                    .firstName
                                            }{" "}
                                            {
                                                order
                                                    .deliveryInfo
                                                    .lastName
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] uppercase tracking-[0.1em] text-[#999999]">
                                            Phone
                                        </p>

                                        <p className="mt-1 text-[#444444]">
                                            {
                                                order
                                                    .deliveryInfo
                                                    .phone
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] uppercase tracking-[0.1em] text-[#999999]">
                                            Email
                                        </p>

                                        <p className="mt-1 break-all text-[#444444]">
                                            {
                                                order
                                                    .deliveryInfo
                                                    .email
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] uppercase tracking-[0.1em] text-[#999999]">
                                            Address
                                        </p>

                                        <p className="mt-1 leading-6 text-[#444444]">
                                            {
                                                order
                                                    .deliveryInfo
                                                    .street
                                            }
                                            <br />

                                            {
                                                order
                                                    .deliveryInfo
                                                    .city
                                            }
                                            ,{" "}
                                            {
                                                order
                                                    .deliveryInfo
                                                    .state
                                            }{" "}
                                            {
                                                order
                                                    .deliveryInfo
                                                    .zipCode
                                            }
                                            <br />

                                            {
                                                order
                                                    .deliveryInfo
                                                    .country
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* =====================================
                        RIGHT
                        ORDER TRACKING
                    ====================================== */}

                    <aside
                        className="
                            h-fit
                            border
                            border-[#D9D9D9]
                            p-6
                        "
                    >
                        {/* TRACKING HEADER */}

                        <div className="flex flex-col gap-3">
                            <h2 className="text-[20px] font-medium text-[#333333]">
                                Track Order
                            </h2>

                            <span className="flex items-center gap-2 text-[14px] text-[#444444]">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#00A63C]" />

                                {statusLabels[order.status as OrderStatus]}
                            </span>
                        </div>

                        {/* TIMELINE */}

                        <OrderTimeline
                            status={
                                order.status as OrderStatus
                            }
                        />

                        {/* PAYMENT */}

                        <div className="mt-9 border-t border-[#E2E2E2] pt-5">
                            <p
                                className="
                                    text-[11px]
                                    uppercase
                                    tracking-[0.1em]
                                    text-[#999999]
                                "
                            >
                                Payment
                            </p>

                            <p className="mt-2 text-[14px] text-[#444444]">
                                {order.paymentStatus}
                            </p>

                            <p className="mt-1 text-[14px] text-[#666666]">
                                {order.paymentMethod}
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}