import CreateProductForm from "@/components/admin/CreateProdcutForm";
import { requireAdmin } from "@/lib/auth-guard";


export default async function ProductAddPage() {
    await requireAdmin();

    return (
        <section className="w-full">
            <CreateProductForm />
        </section>
    );
}