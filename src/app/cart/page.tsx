import { Suspense } from 'react';
import { CartPageContent } from '@/components/CartPage';

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-canvas text-ink flex items-center justify-center">
          <span className="mono text-ink-soft">Loading bag…</span>
        </div>
      }
    >
      <CartPageContent />
    </Suspense>
  );
}
