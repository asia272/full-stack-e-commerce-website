import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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