import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <AdminHeader />

            <div className="relative flex min-h-[calc(100vh-88px)]">
                <AdminSidebar />

                <main
                    className="
                        min-w-0
                        flex-1
                        px-[24px]
                        py-[38px]
                        lg:ml-[308px]
                        lg:px-[88px]
                        lg:py-[40px]
                        mt-15
                    "

                >
                    {children}
                </main>
            </div>
        </div>
    );
}