'use client';

import React from 'react';
import Link from 'next/link';
import { ProductItem, useContent } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';
import { getTechniqueName } from '@/lib/constants';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isLoading } = useContent();
  const techniqueLabel = getTechniqueName(product.technique);

  return (
    <Link
      href={`/product?id=${product.id}`}
      className="product-card group bg-paper flex flex-col"
    >
      <div className="swatch aspect-[4/5] relative flex items-center justify-center overflow-hidden bg-[#EFE3DC]">
        <span className="mono absolute top-3 left-3 bg-paper/90 px-2 py-1 rounded-full text-[9.5px] text-ink z-10">
          {techniqueLabel}
        </span>
        {product.category && (
          <span className="occasion absolute top-3 right-3 bg-ink text-paper px-2 py-1 rounded-full text-[9.5px] mono z-10">
            {product.category}
          </span>
        )}
        {!isLoading && (
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
      <div className="product-body p-4 md:p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-base font-sans font-semibold mb-1 leading-snug">{product.name}</h3>
          {product.description && (
            <p className="text-xs text-ink-soft mb-3 line-clamp-2">{product.description}</p>
          )}
        </div>
        <div className="price-row flex items-center justify-between pt-3 border-t border-border-hair">
          <span className="mono text-[13.5px] text-ink">{product.price}</span>
          <span className="view-link text-[11.5px] font-semibold text-rose border-b border-rose pb-[1px]">
            View
          </span>
        </div>
      </div>
    </Link>
  );
};
