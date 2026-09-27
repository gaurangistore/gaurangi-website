import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ShopByCategory } from '@/components/ShopByCategory';
import { NewArrivals } from '@/components/NewArrivals';
import { WhyGaurangi } from '@/components/WhyGaurangi';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-ink overflow-x-hidden">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Hero Banner */}
      <HeroSection />

      {/* 3. Shop by Category */}
      <ShopByCategory />

      {/* 4. New Arrivals */}
      <NewArrivals />

      {/* 5. Why Gaurangi */}
      <WhyGaurangi />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}
