"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { getCartCount } from "@/app/actions/cart";

type CartContextType = {
    cartCount: number;
    refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(
    undefined
);

export function CartProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [cartCount, setCartCount] = useState(0);

    const refreshCart = useCallback(async () => {
        try {
            const count = await getCartCount();

            setCartCount(count);
        } catch (error) {
            console.error("REFRESH CART COUNT ERROR:", error);
        }
    }, []);

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    return (
        <CartContext.Provider
            value={{
                cartCount,
                refreshCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}