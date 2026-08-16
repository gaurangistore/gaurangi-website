'use client';

import React, { Suspense } from 'react';
import { ProductContent } from '@/components/ProductContent';

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-canvas text-ink flex items-center justify-center py-32"><span className="mono text-ink-soft">Loading the piece…</span></div>}>
      <ProductContent />
    </Suspense>
  );
}
