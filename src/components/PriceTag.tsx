'use client';

import React from 'react';
import { formatINR, resolvePrice, resolveMrp, discountPercent } from '@/lib/price';
import type { ProductItem } from '@/lib/contentDefaults';

/**
 * Renders a product price as formatted currency, with the struck-through MRP
 * and saving only when the product is genuinely on sale.
 *
 * `mrp` below `price` yields no discount (see `discountPercent`), so a
 * mis-entered MRP cannot render a negative or misleading badge.
 */
export const PriceTag: React.FC<{
  product: Pick<ProductItem, 'price' | 'mrp'> | null | undefined;
  className?: string;
  showDiscount?: boolean;
}> = ({ product, className = '', showDiscount = true }) => {
  if (!product) return null;

  const price = resolvePrice(product);
  if (price <= 0) return null;

  const mrp = resolveMrp(product);
  const saving = discountPercent(price, mrp);

  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`.trim()}>
      <span>{formatINR(price)}</span>
      {showDiscount && saving !== null && (
        <>
          <span className="text-ink-soft line-through">{formatINR(mrp)}</span>
          <span className="mono text-[0.62rem] text-burgundy border border-burgundy px-1.5 py-0.5">
            {saving}% off
          </span>
        </>
      )}
    </span>
  );
};
