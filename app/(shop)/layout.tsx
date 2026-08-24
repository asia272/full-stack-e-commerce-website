import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { requireUser } from "@/lib/auth-guard";

export default async function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireUser();
    return (
        <div className="min-h-screen flex flex-col">
            <CartProvider>
                <Navbar />

                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </CartProvider>

        </div>
    );
}