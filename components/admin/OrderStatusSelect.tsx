"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/order";
import type { OrderStatus } from "@/components/order/OrderCard";
import { toast } from "sonner";

interface OrderStatusSelectProps {
    orderId: string;
    currentStatus: OrderStatus;
}

export default function OrderStatusSelect({
    orderId,
    currentStatus,
}: OrderStatusSelectProps) {
    const [isPending, startTransition] = useTransition();

    function handleChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        const status = event.target.value as OrderStatus;

        startTransition(async () => {
            const result = await updateOrderStatus(
                orderId,
                status
            );
            if (result.success) {
                toast.success("Order status updated successfully")
            }
            else {
                toast.error(result.message);
            }
        });
    }

    return (
        <select
            value={currentStatus}
            onChange={handleChange}
            disabled={isPending}
            className="
                border
                border-[#D9D9D9]
                bg-white
                px-3
                py-2
                text-sm
                text-[#444]
                outline-none
                disabled:opacity-50
            "
        >
            <option value="ORDER_PLACED">
                Order Placed
            </option>

            <option value="PACKING">
                Ready to Ship
            </option>

            <option value="SHIPPED">
                Shipped
            </option>

            <option value="OUT_FOR_DELIVERY">
                Out for Delivery
            </option>

            <option value="DELIVERED">
                Delivered
            </option>
        </select>
    );
}