
import { getAllOrders } from "@/app/actions/order";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import { OrderStatus } from "@/components/order/OrderCard";

function formatPrice(price: number) {
    return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

function formatDate(date: string | Date) {
    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

const paymentStatusLabels = {
    PENDING: "Pending",
    PAID: "Paid",
    FAILED: "Failed",
    REFUNDED: "Refunded",
};

export default async function AdminOrdersPage() {

    const result = await getAllOrders();

    if (!result.success || !result.orders) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-medium text-[#333]">
                    Orders
                </h1>

                <p className="mt-4 text-sm text-red-500">
                    {result.message}
                </p>
            </div>
        );
    }

    const orders = result.orders;

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-[1400px] px-6 py-10">
                {/* HEADER */}

                <div className="border-b border-[#D9D9D9] pb-6">
                    <h1 className="text-[28px] font-medium text-[#333]">
                        Orders
                    </h1>

                    <p className="mt-2 text-sm text-[#777]">
                        Manage customer orders and update their
                        delivery status.
                    </p>
                </div>

                {/* ORDERS */}

                <div className="mt-8 space-y-5">
                    {orders.length === 0 ? (
                        <div className="border border-[#D9D9D9] p-10 text-center">
                            <p className="text-[#777]">
                                No orders found.
                            </p>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div
                                key={order.id}
                                className="
                                    border
                                    border-[#D9D9D9]
                                    p-6
                                "
                            >
                                {/* ORDER HEADER */}

                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-4
                                        border-b
                                        border-[#E5E5E5]
                                        pb-5
                                        lg:flex-row
                                        lg:items-center
                                        lg:justify-between
                                    "
                                >
                                    <div>
                                        <p className="text-sm text-[#999]">
                                            Order
                                        </p>

                                        <p className="mt-1 font-medium text-[#333]">
                                            #{order.id}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-[#999]">
                                            Date
                                        </p>

                                        <p className="mt-1 text-sm text-[#444]">
                                            {formatDate(
                                                order.createdAt
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-[#999]">
                                            Total
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-[#333]">
                                            {formatPrice(
                                                Number(order.total)
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-[#999]">
                                            Payment
                                        </p>

                                        <p className="mt-1 text-sm text-[#444]">
                                            {
                                                paymentStatusLabels[
                                                order.paymentStatus
                                                ]
                                            }
                                        </p>

                                        <p className="mt-1 text-xs text-[#888]">
                                            {
                                                order.paymentMethod
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* ORDER BODY */}

                                <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
                                    {/* ITEMS */}

                                    <div>
                                        <h2 className="text-sm font-medium uppercase tracking-wide text-[#777]">
                                            Items
                                        </h2>

                                        <div className="mt-4 space-y-4">
                                            {order.items.map(
                                                (item) => (
                                                    <div
                                                        key={
                                                            item.id
                                                        }
                                                        className="flex gap-4"
                                                    >
                                                        <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#eee]">
                                                            <img
                                                                src={
                                                                    item
                                                                        .product
                                                                        .image[0]
                                                                }
                                                                alt={
                                                                    item
                                                                        .product
                                                                        .name
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>

                                                        <div>
                                                            <p className="font-medium text-[#444]">
                                                                {
                                                                    item
                                                                        .product
                                                                        .name
                                                                }
                                                            </p>

                                                            <p className="mt-1 text-sm text-[#777]">
                                                                Quantity:{" "}
                                                                {
                                                                    item.quantity
                                                                }
                                                            </p>

                                                            <p className="mt-1 text-sm text-[#777]">
                                                                Size:{" "}
                                                                {
                                                                    item.size
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* STATUS */}

                                    <div>
                                        <p className="text-sm font-medium uppercase tracking-wide text-[#777]">
                                            Order Status
                                        </p>

                                        <div className="mt-3">
                                            <OrderStatusSelect
                                                orderId={
                                                    order.id
                                                }
                                                currentStatus={
                                                    order.status as OrderStatus
                                                }
                                            />
                                        </div>

                                        {/* CUSTOMER */}

                                        {order.deliveryInfo && (
                                            <div className="mt-7 border-t border-[#E5E5E5] pt-5">
                                                <p className="text-sm font-medium uppercase tracking-wide text-[#999]">
                                                    Customer
                                                </p>

                                                <p className="mt-2 text-sm text-[#444]">
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

                                                <p className="mt-1 text-sm text-[#777]">
                                                    {
                                                        order
                                                            .deliveryInfo
                                                            .phone
                                                    }
                                                </p>

                                                <p className="mt-1 break-all text-sm text-[#777]">
                                                    {
                                                        order
                                                            .deliveryInfo
                                                            .email
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}