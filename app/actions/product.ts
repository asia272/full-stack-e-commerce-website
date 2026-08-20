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

// ====================================================
// GET ALL PRODUCTS
// ====================================================

export async function getAllProducts() {
    try {
        // ============================================
        // 1. ADMIN CHECK
        // ============================================

        await requireAdmin();

        // ============================================
        // 2. GET PRODUCTS
        // ============================================

        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                category: true,
                price: true,
                image: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // ============================================
        // 3. RETURN SERIALIZABLE DATA
        // ============================================

        return products.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            price: Number(product.price),
            image: product.image,
        }));
    } catch (error) {
        console.error("========== GET ALL PRODUCTS ERROR ==========");
        console.error(error);
        console.error("=============================================");

        throw error;
    }
}

export async function deleteProduct(productId: string) {
    try {
        // ============================================
        // 1. ADMIN CHECK
        // ============================================

        await requireAdmin();

        // ============================================
        // 2. VALIDATE PRODUCT ID
        // ============================================

        if (!productId || typeof productId !== "string") {
            return {
                success: false,
                message: "Invalid product ID",
            };
        }

        // ============================================
        // 3. CHECK PRODUCT EXISTS
        // ============================================

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            select: {
                id: true,
                name: true,
            },
        });

        if (!product) {
            return {
                success: false,
                message: "Product not found",
            };
        }

        // ============================================
        // 4. DELETE PRODUCT
        // ============================================

        await prisma.product.delete({
            where: {
                id: productId,
            },
        });

        // ============================================
        // 5. REVALIDATE LIST PAGE
        // ============================================

        revalidatePath("/admin/list");

        return {
            success: true,
            message: `${product.name} deleted successfully`,
        };
    } catch (error) {
        console.error("========== DELETE PRODUCT ERROR ==========");
        console.error(error);
        console.error("==========================================");

        return {
            success: false,
            message: "Failed to delete product",
        };
    }
}
// ====================================================
// GET LATEST PRODUCTS
// ====================================================

export async function getLatestProducts() {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                image: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });

        return products.map((product) => ({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
        }));
    } catch (error) {
        console.error("========== GET LATEST PRODUCTS ERROR ==========");
        console.error(error);
        console.error("================================================");

        throw new Error("Failed to fetch latest products");
    }
}
// ====================================================
// GET BEST SELLER PRODUCTS
// ====================================================

export async function getBestSellerProducts() {
    try {
        const products = await prisma.product.findMany({
            where: {
                isBestSeller: true,
            },
            select: {
                id: true,
                name: true,
                price: true,
                image: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
        });

        return products.map((product) => ({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
        }));
    } catch (error) {
        console.error("========== GET LATEST PRODUCTS ERROR ==========");
        console.error(error);
        console.error("================================================");

        throw error;
    }
}