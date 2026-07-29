'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Calendar, Sun, Moon, Briefcase, Heart, PartyPopper } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useContent } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

interface OccasionCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  image: string;
  tag: string;
}

const EVENT_MINSETS: OccasionCategory[] = [
  {
    id: 'occ-1',
    title: 'Wedding Celebrations',
    subtitle: 'Royal weaves, heavy zari sarees & embroidered grandeur for sacred vows & grand receptions.',
    icon: <Sparkles className="w-5 h-5 text-[#C5A059]" />,
    image: '/images/model-dummy.jpg',
    tag: 'Bridal & Sacred Edit',
  },
  {
    id: 'occ-2',
    title: 'Festive Rituals',
    subtitle: 'Vibrant organza & lightweight silk drapes for Diwali, Puja ceremonies & family gatherings.',
    icon: <Calendar className="w-5 h-5 text-[#C5A059]" />,
    image: '/images/model-dummy.jpg',
    tag: 'Seasonal Festivities',
  },
  {
    id: 'occ-3',
    title: 'Evening Galas & Sangeet',
    subtitle: 'Micro velvet jackets, fluid satin drapes & choker coordinates for moonlit celebrations.',
    icon: <Moon className="w-5 h-5 text-[#C5A059]" />,
    image: '/images/model-dummy.jpg',
    tag: 'Night & Cocktail',
  },
  {
    id: 'occ-4',
    title: 'Executive & Formal Wear',
    subtitle: 'Structured linen resort shirts & tailored organza coordinates for executive conferences.',
    icon: <Briefcase className="w-5 h-5 text-[#C5A059]" />,
    image: '/images/model-dummy.jpg',
    tag: 'Modern Executive',
  },
  {
    id: 'occ-5',
    title: 'Casual Luxury & Weekend',
    subtitle: 'Breathable organic cottons & effortless prints for weekend brunches & resort getaways.',
    icon: <Sun className="w-5 h-5 text-[#C5A059]" />,
    image: '/images/model-dummy.jpg',
    tag: 'Resort & Daytime',
  },
];

export default function OccasionsLandingPage() {
  const { data } = useContent();
  const activeOccasions = data.occasions && data.occasions.length > 0 ? data.occasions : [];

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1F1F] flex flex-col font-sans">
      <Navbar />

      {/* Hero Header */}
      <section className="py-20 px-6 md:px-12 bg-[#F3EFEA] border-b border-[#EAE5D9] text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#C5A059]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#7A1C30] font-medium">
              Need-First Journey
            </span>
          </div>
          <h1 className="font-serif-editorial text-4xl md:text-6xl text-[#7A1C30] font-light tracking-wide">
            Where are you going?
          </h1>
          <p className="text-sm md:text-base font-light text-[#1F1F1F]/80 font-sans leading-relaxed">
            Shop by event mindset rather than product tags. Whether attending a grand royal wedding or an executive summit, explore curated outfits tailored for every moment.
          </p>
        </div>
      </section>

      {/* Main Occasion Tiles Grid */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-semibold block mb-1">
            Tailored Moments
          </span>
          <h2 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal">
            Shop by Event Type
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {EVENT_MINSETS.map((occ) => (
            <Link
              key={occ.id}
              href={`/occasions/${occ.id}`}
              className="group relative overflow-hidden rounded-2xl bg-[#F3EFEA] border border-[#EAE5D9] transition-all duration-500 hover:shadow-2xl cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={getImageUrl(occ.image)}
                  alt={occ.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Top Tag */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[0.68rem] tracking-widest uppercase font-semibold text-[#7A1C30] border border-[#C5A059]/30 flex items-center gap-1.5">
                    {occ.icon} {occ.tag}
                  </span>
                </div>

                {/* Bottom Text */}
                <div className="absolute bottom-8 left-6 right-6 z-10 text-white flex items-end justify-between">
                  <div>
                    <h3 className="font-serif-editorial text-2xl md:text-3xl font-medium tracking-wide mb-1">
                      {occ.title}
                    </h3>
                    <p className="text-xs md:text-sm font-light text-[#FAF6EE]/80 max-w-md">
                      {occ.subtitle}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#7A1C30] group-hover:border-[#7A1C30]">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
