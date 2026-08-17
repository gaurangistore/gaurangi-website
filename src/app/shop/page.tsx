'use client';

import React, { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShopContent } from '@/components/ShopContent';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col overflow-x-hidden">
      <Navbar />
      <Suspense fallback={<div className="py-32 text-center mono text-ink-soft">Loading the Shop…</div>}>
        <ShopContent />
      </Suspense>
      <Footer />
    </div>
  );
}
