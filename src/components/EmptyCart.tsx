'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const EmptyCart: React.FC = () => {
  const { data } = useContent();
  const cart = data.cartPageContent;

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-[#EFE3DC] flex items-center justify-center mb-6">
        <ShoppingBag size={32} className="text-ink-soft" />
      </div>
      <h2 className="font-display italic text-2xl md:text-3xl text-ink mb-2">
        {cart?.emptyTitle || 'Your bag is empty'}
      </h2>
      <p className="text-ink-soft text-sm max-w-[360px] mb-8">
        {cart?.emptySubtitle || "Looks like you haven\u2019t found your piece yet."}
      </p>
      <Link href={cart?.emptyCtaLink || '/shop'} className="btn-primary">
        {cart?.emptyCtaText || 'Browse the Edit'}
      </Link>
    </div>
  );
};
