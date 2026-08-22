import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import OrderCard, {
    type Order,
} from "@/components/order/OrderCard";

interface OrdersListProps {
    orders: Order[];
}

export default function OrdersList({
    orders,
}: OrdersListProps) {
    if (orders.length === 0) {
        return (
            <div
                className="
                    flex
                    min-h-[360px]
                    flex-col
                    items-center
                    justify-center
                    border
                    border-[#D9D9D9]
                    px-6
                    text-center
                "
            >
                <Package
                    className="h-10 w-10 text-[#999999]"
                    strokeWidth={1.5}
                />

                <h2 className="mt-5 text-[20px] font-medium text-[#444444]">
                    No orders yet
                </h2>

                <p className="mt-2 max-w-sm text-[14px] leading-6 text-[#777777]">
                    You haven't placed any orders yet.
                    Your orders will appear here after you
                    complete a purchase.
                </p>

                <Link
                    href="/products"
                    className="
                        mt-6
                        inline-flex
                        h-[46px]
                        items-center
                        gap-2
                        bg-[#333333]
                        px-6
                        text-[14px]
                        font-medium
                        text-white
                        transition-opacity
                        hover:opacity-80
                    "
                >
                    Start Shopping

                    <ChevronRight
                        className="h-4 w-4"
                        strokeWidth={1.5}
                    />
                </Link>
            </div>
        );
    }

    return (
        <section className="w-full">
            {orders.map((order) => (
                <OrderCard
                    key={order.id}
                    order={order}
                />
            ))}
        </section>
    );
}