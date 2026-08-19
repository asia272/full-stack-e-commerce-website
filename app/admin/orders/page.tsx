import { requireAdmin } from "@/lib/auth-guard";

export default async function AdminOrdersPage() {
    await requireAdmin();

    return (
        <div>
            <h1 className="text-2xl font-medium text-[#333]">
                Orders
            </h1>
        </div>
    );
}