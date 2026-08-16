import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center py-32 px-6">
        <span className="mono text-rose mb-3">404</span>
        <h1 className="font-display italic text-3xl md:text-4xl mb-2">This page doesn&apos;t exist</h1>
        <p className="text-ink-soft text-sm max-w-[360px] mb-8">
          The page you&apos;re looking for may have moved. Head back to the shop to keep browsing.
        </p>
        <div className="flex items-center gap-3">
          <Link href="/" className="btn-outline">
            Back Home
          </Link>
          <Link href="/shop" className="btn-primary">
            Visit the Edit
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
