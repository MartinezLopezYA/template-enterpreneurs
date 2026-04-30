'use client';

import { createContext, useContext, useState } from 'react';
import type { Product } from '@/types/product';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextValue {
    items: CartItem[];
    count: number;
    total: number;
    isOpen: boolean;
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    updateQty: (id: string, qty: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextValue>({
    items: [],
    count: 0,
    total: 0,
    isOpen: false,
    addItem: () => {},
    removeItem: () => {},
    updateQty: () => {},
    clearCart: () => {},
    openCart: () => {},
    closeCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    function addItem(product: Product) {
        setItems(prev => {
            const existing = prev.find(i => i.product.id === product.id);
            if (existing) {
                return prev.map(i =>
                    i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
        setIsOpen(true);
    }

    function removeItem(id: string) {
        setItems(prev => prev.filter(i => i.product.id !== id));
    }

    function updateQty(id: string, qty: number) {
        if (qty <= 0) { removeItem(id); return; }
        setItems(prev => prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i));
    }

    function clearCart() { setItems([]); }

    return (
        <CartContext.Provider value={{
            items, count, total, isOpen,
            addItem, removeItem, updateQty, clearCart,
            openCart: () => setIsOpen(true),
            closeCart: () => setIsOpen(false),
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
