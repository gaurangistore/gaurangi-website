'use client';

import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useContent } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';
import Link from 'next/link';

interface CartItemProps {
  productId: string;
  quantity: number;
}

export const CartItem: React.FC<CartItemProps> = ({ productId, quantity }) => {
  const { updateQuantity, removeItem } = useCart();
  const { data } = useContent();
  const product = (data.products || []).find((p) => p.id === productId);

  if (!product) return null;

  return (
    <div className="flex gap-4 py-5 border-b border-border-hair">
      <Link
        href={`/product?id=${product.id}`}
        className="w-20 h-24 md:w-24 md:h-28 flex-shrink-0 overflow-hidden bg-[#EFE3DC] border border-border-hair"
      >
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {product.category && (
              <span className="mono text-rose text-[10px] block mb-0.5">{product.category}</span>
            )}
            <Link
              href={`/product?id=${product.id}`}
              className="font-display text-base md:text-lg text-ink leading-tight block truncate hover:text-rose transition-colors"
            >
              {product.name}
            </Link>
            {product.fabric && (
              <span className="text-xs text-ink-soft mt-0.5 block">{product.fabric}</span>
            )}
          </div>
          <span className="font-sans text-sm font-semibold text-ink whitespace-nowrap">
            {product.price}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-border-hair rounded-full">
            <button
              onClick={() => updateQuantity(productId, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-ink hover:text-rose transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => updateQuantity(productId, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-ink hover:text-rose transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => removeItem(productId)}
            className="text-ink-soft hover:text-red-600 transition-colors p-1"
            title="Remove"
            aria-label="Remove item"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
