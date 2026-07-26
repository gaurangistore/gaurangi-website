'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EAE5D9] py-4'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent text-white py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-black/5 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? 'text-[#1F1F1F]' : 'text-white'} size={24} />
            ) : (
              <Menu className={isScrolled ? 'text-[#1F1F1F]' : 'text-white'} size={24} />
            )}
          </button>

          {/* Left Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[0.88rem] tracking-widest uppercase font-medium">
            <Link
              href="#collections"
              className={`transition-colors hover:text-[#C5A059] ${
                isScrolled ? 'text-[#1F1F1F]' : 'text-white'
              }`}
            >
              Collections
            </Link>
            <Link
              href="#occasions"
              className={`transition-colors hover:text-[#C5A059] ${
                isScrolled ? 'text-[#1F1F1F]' : 'text-white'
              }`}
            >
              Occasions
            </Link>
            <Link
              href="#new-arrivals"
              className={`transition-colors hover:text-[#C5A059] ${
                isScrolled ? 'text-[#1F1F1F]' : 'text-white'
              }`}
            >
              New Arrivals
            </Link>
            <Link
              href="#stories"
              className={`transition-colors hover:text-[#C5A059] ${
                isScrolled ? 'text-[#1F1F1F]' : 'text-white'
              }`}
            >
              Stories
            </Link>
            <Link
              href="#about"
              className={`transition-colors hover:text-[#C5A059] ${
                isScrolled ? 'text-[#1F1F1F]' : 'text-white'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Center Brand Logo */}
          <Link href="/" className="text-center group">
            <h1
              className={`font-serif-editorial text-2xl md:text-3xl tracking-[0.2em] font-medium uppercase transition-colors ${
                isScrolled ? 'text-[#7A1C30]' : 'text-white'
              }`}
            >
              GAURANGI
            </h1>
            <span
              className={`block text-[0.62rem] tracking-[0.35em] uppercase font-sans mt-[2px] transition-colors ${
                isScrolled ? 'text-[#C5A059]' : 'text-[#FAF6EE]/80'
              }`}
            >
              Fashions • Boutique
            </span>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-5 md:gap-6">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full transition-transform hover:scale-105 ${
                isScrolled ? 'text-[#1F1F1F] hover:text-[#7A1C30]' : 'text-white hover:text-[#C5A059]'
              }`}
              title="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <Link
              href="#wishlist"
              className={`p-2 rounded-full transition-transform hover:scale-105 ${
                isScrolled ? 'text-[#1F1F1F] hover:text-[#7A1C30]' : 'text-white hover:text-[#C5A059]'
              }`}
              title="Wishlist"
            >
              <Heart size={20} strokeWidth={1.5} />
            </Link>

            <button
              className={`p-2 rounded-full transition-transform hover:scale-105 ${
                isScrolled ? 'text-[#1F1F1F] hover:text-[#7A1C30]' : 'text-white hover:text-[#C5A059]'
              }`}
              title="Account"
            >
              <User size={20} strokeWidth={1.5} />
            </button>

            <button
              className={`relative p-2.5 rounded-full transition-transform hover:scale-105 ${
                isScrolled
                  ? 'bg-[#7A1C30] text-white shadow-md'
                  : 'bg-white/20 backdrop-blur-md text-white border border-white/30'
              }`}
              title="Wardrobe Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.8} />
              <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[0.65rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Search Overlay Input */}
        {searchOpen && (
          <div className="bg-white border-b border-[#EAE5D9] px-6 py-4 transition-all">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search size={18} className="text-[#C5A059]" />
              <input
                type="text"
                placeholder="Search collections, silk weaves, artisanal edits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-[#1F1F1F] placeholder:text-gray-400 font-sans"
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-black">
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="w-4/5 max-w-sm bg-[#FAF6EE] h-full p-8 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="mb-10">
                <h2 className="font-serif-editorial text-2xl text-[#7A1C30] tracking-widest uppercase">
                  GAURANGI
                </h2>
                <span className="text-[0.65rem] text-[#C5A059] tracking-widest uppercase">
                  Fashions • Boutique
                </span>
              </div>

              <nav className="flex flex-col gap-6 text-sm tracking-widest uppercase font-medium">
                <Link href="#collections" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7A1C30]">
                  Collections
                </Link>
                <Link href="#occasions" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7A1C30]">
                  Occasions
                </Link>
                <Link href="#new-arrivals" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7A1C30]">
                  New Arrivals
                </Link>
                <Link href="#stories" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7A1C30]">
                  Stories
                </Link>
                <Link href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7A1C30]">
                  About
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#EAE5D9] text-xs text-gray-500">
              <p>© Gaurangi Fashions. Crafted for timeless elegance.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
