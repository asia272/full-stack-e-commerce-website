import { requireAdmin } from "@/lib/auth-guard";


export default async function AdminDashboard() {
    const user = await requireAdmin();

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <p>
                Welcome, {user.name}
            </p>
        </div>
    );
}