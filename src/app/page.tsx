'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';
import { isSectionLive } from '@/lib/schedule';
import type { SectionKey } from '@/lib/contentDefaults';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { ShopByCategory } from '@/components/ShopByCategory';
import { NewArrivals } from '@/components/NewArrivals';
import { FeaturedCollection } from '@/components/FeaturedCollection';
import { WhyGaurangi } from '@/components/WhyGaurangi';
import { Services } from '@/components/Services';
import { CraftSection } from '@/components/CraftSection';
import { ArtisansSection } from '@/components/ArtisansSection';
import { StyleNotes } from '@/components/StyleNotes';

/**
 * Section registry.
 *
 * Render order comes from `data.sectionOrder` rather than from JSX, so the admin
 * can rearrange or schedule the page without a redeploy. Each entry is still an
 * individual component, which keeps every section independently testable and
 * lets a section decide for itself that it has nothing to show.
 */
const SECTION_COMPONENTS: Record<SectionKey, React.FC> = {
  hero: HeroSection,
  categories: ShopByCategory,
  newArrivals: NewArrivals,
  featuredCollection: FeaturedCollection,
  whyGaurangi: WhyGaurangi,
  services: Services,
  craft: CraftSection,
  artisans: ArtisansSection,
  stories: StyleNotes,
};

export default function Home() {
  const { data } = useContent();
  const order = data.sectionOrder || [];

  return (
    <div className="min-h-screen bg-ivory text-ink flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-x-hidden">
        {order.map((section) => {
          // `isSectionLive` covers both the visible flag and any scheduled
          // window. Unknown keys are already filtered during normalization.
          if (!isSectionLive(section)) return null;
          const Section = SECTION_COMPONENTS[section.key];
          if (!Section) return null;
          return <Section key={section.key} />;
        })}
      </main>

      <Footer />
    </div>
  );
}
