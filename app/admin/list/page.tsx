import { requireAdmin } from "@/lib/auth-guard";

export default async function AdminListItemsPage() {
    await requireAdmin();

    return (
        <div>
            <h1 className="text-2xl font-medium text-[#333]">
                List Items
            </h1>
        </div>
    );
}