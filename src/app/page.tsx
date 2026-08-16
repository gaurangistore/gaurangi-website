import React, { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ShopByTechnique } from '@/components/ShopByTechnique';
import { CraftSection } from '@/components/CraftSection';
import { NewArrivals } from '@/components/NewArrivals';
import { WhyGaurangi } from '@/components/WhyGaurangi';
import { ArtisansSection } from '@/components/ArtisansSection';
import { StyleNotes } from '@/components/StyleNotes';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-ink overflow-x-hidden">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Hero Banner */}
      <HeroSection />

      {/* 3. Shop by Technique */}
      <ShopByTechnique />

      {/* 4. The Craft */}
      <CraftSection />

      {/* 5. New Arrivals (8 Featured Products Grid) */}
      <Suspense fallback={null}>
        <NewArrivals />
      </Suspense>

      {/* 6. Why Gaurangi (4 Scannable Trust Pillars) */}
      <WhyGaurangi />

      {/* 7. Artisans */}
      <ArtisansSection />

      {/* 8. Style Notes */}
      <StyleNotes />

      {/* 9. Newsletter Subscription */}
      <Newsletter />

      {/* 10. Boutique Footer */}
      <Footer />
    </main>
  );
}
