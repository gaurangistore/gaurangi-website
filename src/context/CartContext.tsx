'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useContent } from '@/context/ContentContext';

interface CartEntry {
  productId: string;
  quantity: number;
}

interface CartContextType {
  items: CartEntry[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
});

const STORAGE_KEY = 'gaurangi_cart';

function parsePrice(price: string): number {
  if (!price) return 0;
  const cleaned = price.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

function loadCart(): CartEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore corrupt data
  }
  return [];
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data } = useContent();
  const products = data.products || [];
  const [items, setItems] = useState<CartEntry[]>(loadCart);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
    mounted.current = true;
  }, [items]);

  const addItem = useCallback((productId: string) => {
    setItems((prev) => {
      const existing = prev.find((e) => e.productId === productId);
      if (existing) {
        return prev.map((e) =>
          e.productId === productId ? { ...e, quantity: e.quantity + 1 } : e
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((e) => e.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((e) => e.productId !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((e) => (e.productId === productId ? { ...e, quantity } : e))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, e) => sum + e.quantity, 0);

  const subtotal = items.reduce((sum, e) => {
    const product = products.find((p) => p.id === e.productId);
    return sum + parsePrice(product?.price || '0') * e.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
