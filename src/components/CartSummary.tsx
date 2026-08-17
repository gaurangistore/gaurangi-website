'use client';

import React from 'react';
import { MessageCircle, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useContent } from '@/context/ContentContext';

export const CartSummary: React.FC = () => {
  const { items, subtotal } = useCart();
  const { data } = useContent();
  const settings = data.productPageSettings;
  const cart = data.cartPageContent;
  const products = data.products || [];

  const whatsAppNumber = settings?.whatsAppNumber || '+919876543210';

  const buildOrderMessage = () => {
    const lines = ['Hi Gaurangi! I\'d like to order:', ''];
    items.forEach((entry) => {
      const product = products.find((p) => p.id === entry.productId);
      if (product) {
        lines.push(`1. ${product.name} × ${entry.quantity} — ${product.price}`);
      }
    });
    lines.push('');
    lines.push(`Total: ₹${subtotal.toLocaleString('en-IN')}`);
    lines.push('');
    lines.push('Please share payment details.');
    return lines.join('\n');
  };

  const handleWhatsApp = () => {
    const message = buildOrderMessage();
    window.open(
      `https://wa.me/${whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="bg-paper border border-border-hair p-6 md:p-7 space-y-5 sticky top-24">
      <h2 className="font-display text-xl text-ink">
        {cart?.summaryTitle || 'Order Summary'}
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-ink">
          <span>Subtotal</span>
          <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-ink-soft">
          <span>Shipping</span>
          <span className="text-emerald-600 font-medium">Free</span>
        </div>
        <div className="border-t border-border-hair pt-3 flex justify-between text-ink font-semibold">
          <span>Total</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <button
        onClick={handleWhatsApp}
        className="w-full py-3.5 px-4 rounded-full border border-emerald text-emerald hover:bg-emerald hover:text-paper transition-all text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
      >
        <MessageCircle size={16} />
        {cart?.whatsappButtonText || 'Order via WhatsApp'}
      </button>

      <div className="grid grid-cols-1 gap-3 pt-4 border-t border-border-hair text-xs text-ink-soft">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-rose shrink-0" />
          <span>{cart?.trustBadge1 || 'Hand-cut, not laser-cut'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-rose shrink-0" />
          <span>{cart?.trustBadge2 || 'Free shipping across India'}</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw size={16} className="text-rose shrink-0" />
          <span>{cart?.trustBadge3 || 'Easy 7-day returns'}</span>
        </div>
      </div>
    </div>
  );
};
