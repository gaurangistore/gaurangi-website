'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';

export const Footer: React.FC = () => {
  const { data } = useContent();
  const contact = data.contactInfo || {
    storeName: 'Gaurangi Fashions',
    tagline: 'A premium digital fashion boutique where every collection tells a story.',
    email: 'gaurangi.store@gmail.com',
  };

  return (
    <footer className="bg-[#1F1F1F] text-white pt-20 pb-12 border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand Story Column */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <Link href="/" className="group">
            <h2 className="font-serif-editorial text-2xl tracking-[0.2em] uppercase text-white font-medium">
              GAURANGI
            </h2>
            <span className="text-[0.62rem] tracking-[0.35em] uppercase text-[#C5A059]">
              Fashions • Boutique
            </span>
          </Link>
          <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm mt-2 font-sans">
            "{contact.tagline}" Designed with passion, curated by artisans, and woven from natural luxury fabrics.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#C5A059] mt-2">
            <span>New Delhi</span> • <span>Mumbai</span> • <span>Bengaluru</span>
          </div>
        </div>

        {/* Collections */}
        <div className="md:col-span-3">
          <h4 className="font-serif-editorial text-lg text-[#C5A059] mb-5 tracking-wide">
            Collections
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-gray-300 font-light">
            <li><Link href="#collections" className="hover:text-[#C5A059] transition">Wedding Collection</Link></li>
            <li><Link href="#collections" className="hover:text-[#C5A059] transition">Festive Splendor</Link></li>
            <li><Link href="#collections" className="hover:text-[#C5A059] transition">Daily Elegance</Link></li>
            <li><Link href="#collections" className="hover:text-[#C5A059] transition">Contemporary Formals</Link></li>
            <li><Link href="#collections" className="hover:text-[#C5A059] transition">Artisan Accessories</Link></li>
          </ul>
        </div>

        {/* Customer Care & Policies */}
        <div className="md:col-span-4">
          <h4 className="font-serif-editorial text-lg text-[#C5A059] mb-5 tracking-wide">
            Customer Experience
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-gray-300 font-light mb-6">
            <li><Link href="#" className="hover:text-[#C5A059] transition">Private Styling Consultations</Link></li>
            <li><Link href="#" className="hover:text-[#C5A059] transition">Complimentary Express Delivery</Link></li>
            <li><Link href="#" className="hover:text-[#C5A059] transition">Authenticity & Fabric Care</Link></li>
            <li><Link href="#" className="hover:text-[#C5A059] transition">Boutique Return Policy</Link></li>
          </ul>
          <div className="text-xs text-gray-400">
            <span>Client Care: </span>
            <a href={`mailto:${contact.email}`} className="text-[#C5A059] underline hover:text-white">
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-[0.72rem] text-gray-500 gap-4">
        <p>© 2026 Gaurangi Fashions. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-gray-300">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-300">Terms of Service</Link>
          <Link href="#" className="hover:text-gray-300">Boutique Locations</Link>
        </div>
      </div>
    </footer>
  );
};
