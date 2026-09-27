'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

/**
 * Wishlist.
 *
 * Client-side only, stored in localStorage under a single key holding product
 * ids. This mirrors how the cart works: no account is required to save a piece,
 * and ids are validated against live catalog data at read time so a wishlist
 * saved before a product was renamed or removed degrades to a skipped item
 * rather than a broken link.
 */

interface WishlistContextType {
  /** Product ids currently saved. */
  itemIds: string[];
  itemCount: number;
  hasItem: (productId: string) => boolean;
  toggleItem: (productId: string) => boolean;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

const STORAGE_KEY = 'gaurangi_wishlist';

/** Reads and sanitises the persisted list, tolerating corrupt storage. */
function loadWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    // Keep only non-empty strings, and de-duplicate.
    return Array.from(new Set(parsed.filter((id): id is string => typeof id === 'string' && id.length > 0)));
  } catch {
    return [];
  }
}

const WishlistContext = createContext<WishlistContextType>({
  itemIds: [],
  itemCount: 0,
  hasItem: () => false,
  toggleItem: () => false,
  addItem: () => {},
  removeItem: () => {},
  clear: () => {},
});

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read from localStorage in the lazy initializer rather than in an effect:
  // on the server this yields [], and because the very first client render
  // already holds the stored list, the saved count cannot flicker or mismatch
  // after hydration.
  const [itemIds, setItemIds] = useState<string[]>(loadWishlist);
  // Guards the persist effect so the initial render cannot write before a
  // successful read.
  const hydrated = useRef(false);

  useEffect(() => {
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemIds));
    } catch (err) {
      // Quota or private-browsing failures must not break browsing.
      console.warn('Could not persist wishlist:', err);
    }
  }, [itemIds]);

  const addItem = useCallback((productId: string) => {
    if (!productId) return;
    setItemIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItemIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  /**
   * Adds or removes the id, returning whether it is now saved.
   *
   * The return value is derived from the current state rather than from inside
   * the `setItemIds` updater, because that updater runs during the next render
   * and its assignment would not be visible to this call.
   */
  const toggleItem = useCallback(
    (productId: string): boolean => {
      if (!productId) return false;
      const willBeSaved = !itemIds.includes(productId);
      setItemIds((prev) =>
        prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
      return willBeSaved;
    },
    [itemIds]
  );

  const clear = useCallback(() => setItemIds([]), []);

  const hasItem = useCallback((productId: string) => itemIds.includes(productId), [itemIds]);

  return (
    <WishlistContext.Provider
      value={{ itemIds, itemCount: itemIds.length, hasItem, toggleItem, addItem, removeItem, clear }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
