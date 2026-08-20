import { getCollectionProducts } from "@/app/actions/product";
import CollectionClient from "@/components/product/CollectionClient";

type SearchParams = {
    search?: string;
    category?: string;
    subCategory?: string;
    sort?: string;
};

export default async function CollectionPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;

    const categories = params.category
        ? params.category
            .split(",")
            .filter(
                (value): value is "MEN" | "WOMEN" | "CHILDREN" =>
                    ["MEN", "WOMEN", "CHILDREN"].includes(value),
            )
        : [];

    const subCategories = params.subCategory
        ? params.subCategory
            .split(",")
            .filter(
                (value): value is "TOPWEAR" | "UPPERWEAR" =>
                    ["TOPWEAR", "UPPERWEAR"].includes(value),
            )
        : [];

    const sort =
        params.sort === "low-high" ||
            params.sort === "high-low" ||
            params.sort === "newest"
            ? params.sort
            : "newest";

    const search = params.search?.trim() ?? "";

    const products = await getCollectionProducts({
        categories,
        subCategories,
        sort,
        search,
    });

    return (
        <CollectionClient
            products={products}
            selectedCategories={categories}
            selectedSubCategories={subCategories}
            selectedSort={sort}
            search={search}
        />
    );
}