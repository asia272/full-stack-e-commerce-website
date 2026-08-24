import { requireAdmin } from "@/lib/auth-guard";

export default async function AdminDashboard() {

    const user = await requireAdmin();

    return (
        <section>
            <h1 className="text-[28px] font-medium text-[#333]">
                Admin Dashboard
            </h1>

            <p className="mt-[8px] text-[17px] text-[#666]">
                Welcome, {user.name}
            </p>
        </section>
    );
}