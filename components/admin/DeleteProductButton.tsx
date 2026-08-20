"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteProduct } from "@/app/actions/product";
import { Loader2, X } from "lucide-react";

type DeleteProductButtonProps = {
    productId: string;
    productName: string;
};

export default function DeleteProductButton({
    productId,
    productName,
}: DeleteProductButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [showModal, setShowModal] = useState(false);

    // ============================================
    // OPEN MODAL
    // ============================================

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    // ============================================
    // CLOSE MODAL
    // ============================================

    const handleCancel = () => {
        if (isPending) return;

        setShowModal(false);
    };

    // ============================================
    // DELETE PRODUCT
    // ============================================

    const handleConfirmDelete = () => {
        startTransition(async () => {
            try {
                const result = await deleteProduct(productId);

                if (result.success) {
                    toast.success(result.message);

                    setShowModal(false);
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                console.error(error);

                toast.error(
                    "Something went wrong while deleting product"
                );
            }
        });
    };

    return (
        <>
            {/* ============================================
                DELETE BUTTON
            ============================================ */}

            <button
                type="button"
                onClick={handleDeleteClick}
                disabled={isPending}
                aria-label={`Delete ${productName}`}
                className="flex items-center cursor-pointer justify-center text-[#555] transition-colors hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <X className="h-5 w-5" />
                )}
            </button>
            {/* ============================================
                DELETE CONFIRMATION MODAL
            ============================================ */}

            {showModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
                    {/* Modal */}
                    <div className="w-full max-w-[420px] bg-white px-7 py-6 shadow-xl">
                        {/* Title */}
                        <h2 className="text-[20px] font-medium text-[#333]">
                            Delete Product
                        </h2>

                        {/* Message */}
                        <p className="mt-3 text-[14px] leading-6 text-[#666]">
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-[#333]">
                                "{productName}"
                            </span>
                            ?
                        </p>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-end gap-3">
                            {/* Cancel */}
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isPending}
                                className="border bg-[#333]  border-[#ddd] px-5 py-2 text-[14px] text-white cursor-pointer transition-colors  hover:bg-black  disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            {/* Delete */}
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                disabled={isPending}
                                className="bg-red-600 cursor-pointer px-5 py-2 text-[14px] text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isPending ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}