import { getMyOrders } from "@/app/actions/order";
import OrdersList from "@/components/order/OrdersList";
import Title from "@/components/Title";

export default async function OrdersPage() {
    const result = await getMyOrders();

    if (!result.success) {
        return (
            <main className="min-h-screen bg-white">
                <div
                    className="
                        mx-auto
                        w-full
                        max-w-[1660px]
                        px-5
                        py-14
                        sm:px-8
                        sm:py-16
                        lg:px-[60px]
                    "
                >
                    {/* PAGE TITLE */}
                    <div className="flex items-center gap-3">
                        <h1
                            className="
                                text-[28px]
                                font-medium
                                leading-none
                                tracking-[-0.5px]
                                text-[#707070]
                                sm:text-[30px]
                            "
                        >
                            MY
                        </h1>

                        <h1
                            className="
                                text-[28px]
                                font-semibold
                                leading-none
                                tracking-[-0.5px]
                                text-[#303030]
                                sm:text-[30px]
                            "
                        >
                            ORDERS
                        </h1>

                        <span
                            className="
                                ml-1
                                mt-1
                                h-[2px]
                                w-[50px]
                                bg-[#444444]
                            "
                        />
                    </div>

                    {/* DIVIDER */}
                    <div className="mt-9 border-t border-[#D9D9D9]" />

                    <p className="mt-6 text-[14px] text-[#777777]">
                        {result.message}
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
                    max-w-[1660px]
                    px-5
                    py-14
                    sm:px-8
                    sm:py-16
                    lg:px-[60px]
                "
            >
                {/* =========================================
                    PAGE HEADER
                ========================================== */}
                <Title title="MY" highlight="ORDERS" align="start" highlightWeight="semibold" className="mb-0" />
                {/* =========================================
                    HEADER DIVIDER
                ========================================== */}
                <div className="mt-9 border-t border-[#D9D9D9]" />

                {/* =========================================
                    ORDERS
                ========================================== */}
                <OrdersList orders={result.orders} />
            </div>
        </main>
    );
}