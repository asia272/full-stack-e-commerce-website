"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

type CreateProductInput = {
    name: string;
    description: string;
    category: "MEN" | "WOMEN" | "CHILDREN";
    subCategory: "TOPWEAR" | "UPPERWEAR";
    price: string;
    sizes: ("S" | "M" | "L" | "XL" | "XXL")[];
    isBestSeller: boolean;
    image: string[];
};

export async function createProduct(input: CreateProductInput) {
    try {
        // ============================================
        // 1. ADMIN CHECK
        // ============================================

        await requireAdmin();

        // ============================================
        // 2. BASIC VALIDATION
        // ============================================

        const name = input.name.trim();
        const description = input.description.trim();
        const price = input.price.trim();

        if (!name) {
            throw new Error("Product name is required");
        }

        if (!description) {
            throw new Error("Product description is required");
        }

        if (!price) {
            throw new Error("Product price is required");
        }

        const numericPrice = Number(price);

        if (!Number.isFinite(numericPrice)) {
            throw new Error("Product price must be a valid number");
        }

        if (numericPrice < 0) {
            throw new Error("Product price cannot be negative");
        }

        // ============================================
        // 3. IMAGE VALIDATION
        // ============================================

        if (!Array.isArray(input.image)) {
            throw new Error("Product images must be an array");
        }

        if (input.image.length === 0) {
            throw new Error("Please upload at least one image ");
        }

        if (input.image.length > 4) {
            throw new Error("Maximum 4 images are allowed");
        }

        // ============================================
        // 4. SIZE VALIDATION
        // ============================================

        if (!Array.isArray(input.sizes)) {
            throw new Error("Product sizes must be an array");
        }

        const allowedSizes = [
            "S",
            "M",
            "L",
            "XL",
            "XXL",
        ] as const;

        for (const size of input.sizes) {
            if (!allowedSizes.includes(size)) {
                throw new Error(`Invalid product size: ${size}`);
            }
        }

        // ============================================
        // 5. CATEGORY VALIDATION
        // ============================================

        const allowedCategories = [
            "MEN",
            "WOMEN",
            "CHILDREN",
        ] as const;

        if (!allowedCategories.includes(input.category)) {
            throw new Error("Invalid product category");
        }

        // ============================================
        // 6. SUB CATEGORY VALIDATION
        // ============================================

        const allowedSubCategories = [
            "TOPWEAR",
            "UPPERWEAR",
        ] as const;

        if (!allowedSubCategories.includes(input.subCategory)) {
            throw new Error("Invalid product sub category");
        }

        // ============================================
        // 7. CREATE PRODUCT
        // ============================================

        const product = await prisma.product.create({
            data: {
                name,
                description,

                category: input.category,

                subCategory: input.subCategory,

                price: numericPrice,

                sizes: input.sizes,

                isBestSeller: input.isBestSeller,

                image: input.image,
            },
        });

        // ============================================
        // 8. REVALIDATE
        // ============================================

        revalidatePath("/admin");
        revalidatePath("/admin/products");
        revalidatePath("/");

        // ============================================
        // 9. RETURN RESULT
        // ============================================

        return {
            success: true,
            productId: product.id,
            message: "Product created successfully",
        };
    } catch (error) {
        console.error("========== CREATE PRODUCT ERROR ==========");
        console.error(error);
        console.error("==========================================");

        throw error;

    }
}