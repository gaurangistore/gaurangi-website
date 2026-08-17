'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useContent } from '@/context/ContentContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartItem } from '@/components/CartItem';
import { CartSummary } from '@/components/CartSummary';
import { EmptyCart } from '@/components/EmptyCart';

export const CartPageContent: React.FC = () => {
  const { items } = useCart();
  const { data } = useContent();
  const router = useRouter();
  const cart = data.cartPageContent;

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col overflow-x-hidden">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-paper border-b border-border-hair py-3">
        <div className="wrap flex items-center gap-2 text-xs text-ink-soft">
          <Link href="/" className="hover:text-rose">Home</Link>
          <span>/</span>
          <span className="text-rose font-medium">{cart?.pageTitle || 'Shopping Bag'}</span>
        </div>
      </div>

      <main className="flex-1">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="wrap py-10 md:py-14">
            <h1 className="font-display italic text-[clamp(28px,3.6vw,40px)] mb-8 md:mb-10">
              {cart?.pageTitle || 'Shopping Bag'}
              <span className="text-ink-soft text-base ml-3 not-italic font-sans font-normal">
                ({items.length} {items.length === 1 ? 'item' : 'items'})
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Cart Items */}
              <div className="lg:col-span-7">
                {items.map((entry) => (
                  <CartItem
                    key={entry.productId}
                    productId={entry.productId}
                    quantity={entry.quantity}
                  />
                ))}

                <button
                  onClick={() => router.back()}
                  className="mt-6 flex items-center gap-2 text-sm text-ink-soft hover:text-rose transition-colors"
                >
                  <ArrowLeft size={16} />
                  Continue Shopping
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-5">
                <CartSummary />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
