'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function OrdersTab() {
  // In a real application, we would fetch orders from Firestore here.
  // For now, we display an empty state since checkout is not implemented.
  const orders: any[] = [];

  return (
    <div>
      <h3 className="font-serif text-2xl text-ink mb-6">Order History</h3>
      
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-hairline rounded-xl bg-gray-50">
          <ShoppingBag className="w-12 h-12 text-ink-soft mb-4" />
          <h4 className="text-lg font-medium text-ink mb-2">No orders yet</h4>
          <p className="text-sm text-ink-soft max-w-sm mb-6">
            When you place orders, they will appear here. Start exploring our collections to find your perfect piece.
          </p>
          <Link
            href="/shop"
            className="bg-ink text-white px-6 py-2 rounded-md font-medium hover:bg-burgundy transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Order list would render here */}
        </div>
      )}
    </div>
  );
}
