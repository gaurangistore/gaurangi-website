'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, Heart, User } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { BrandLogo } from '@/components/BrandLogo';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useContent();
  const { itemCount } = useCart();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
  ];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
    setSearchOpen(false);
    setSearchQuery('');
  };

  const brand = data.contactInfo?.storeName || 'Gaurangi';

  return (
    <>
      <header
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 bg-ivory/90 backdrop-blur-md border-b border-hairline ${
          isScrolled ? 'py-2' : 'py-3'
        }`}
      >
        <div className="wrap flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-ink/5 transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={22} className="text-ink" />
            ) : (
              <Menu size={22} className="text-ink" />
            )}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13.5px] font-medium">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 transition-colors ${
                    active
                      ? 'text-gold-ink after:absolute after:left-0 after:-bottom-[6px] after:w-full after:h-[1.5px] after:bg-gold'
                      : 'text-ink hover:text-gold-ink'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Brand Logo */}
          <Link href="/" className="group flex flex-col items-center" aria-label={`${brand} — home`}>
            <BrandLogo brand={data.contactInfo} variant="horizontal" />
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full transition-transform hover:scale-105 text-ink hover:text-gold-ink min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Search"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.6} />
            </button>

            <button
              className="hidden md:flex p-2 rounded-full transition-transform hover:scale-105 text-ink hover:text-gold-ink items-center justify-center"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={20} strokeWidth={1.6} />
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-4">
                {profile?.role === 'admin' && (
                  <Link href="/admin" className="text-sm font-medium hover:text-gold-ink">
                    Admin
                  </Link>
                )}
                <Link
                  href="/account"
                  className="p-2 rounded-full transition-transform hover:scale-105 text-ink hover:text-gold-ink items-center justify-center"
                  title="Account"
                  aria-label="Account"
                >
                  <User size={20} strokeWidth={1.6} />
                </Link>
              </div>
            ) : (
              <Link
                href="/auth"
                className="hidden md:flex p-2 rounded-full transition-transform hover:scale-105 text-ink hover:text-gold-ink items-center justify-center"
                title="Sign In"
                aria-label="Sign In"
              >
                <User size={20} strokeWidth={1.6} />
              </Link>
            )}

            <Link
              href="/cart"
              className="relative p-2.5 rounded-full transition-transform hover:scale-105 bg-ink text-paper shadow-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Bag"
              aria-label="Bag"
            >
              <ShoppingBag size={18} strokeWidth={1.8} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-burgundy text-white text-[0.65rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Overlay Input */}
        {searchOpen && (
          <div className="bg-paper border-b border-hairline px-6 py-4">
            <form onSubmit={submitSearch} className="wrap flex items-center gap-3">
              <Search size={18} className="text-gold-ink shrink-0" />
              <input
                type="text"
                placeholder="Search products, techniques, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-ink placeholder:text-ink-soft font-sans min-h-[44px]"
                autoFocus
                aria-label="Search query"
              />
              <button
                type="submit"
                className="text-xs font-semibold uppercase tracking-widest text-gold-ink hover:text-ink whitespace-nowrap"
              >
                Go
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-ink-soft hover:text-ink"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-4/5 max-w-sm bg-paper h-full p-6 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Menu"
          >
            <div>
              <div className="mb-8">
                <BrandLogo brand={data.contactInfo} variant="stacked" />
              </div>

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-3 text-sm tracking-widest uppercase font-medium min-h-[44px] flex items-center border-l-2 pl-3 transition-colors ${
                        active
                          ? 'text-gold-ink border-gold'
                          : 'text-ink border-transparent hover:text-gold-ink'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <div className="my-4 border-t border-hairline" />

                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-sm tracking-widest uppercase font-medium min-h-[44px] flex items-center gap-3 text-ink hover:text-gold-ink"
                >
                  <Heart size={16} /> Wishlist
                </Link>
                {user ? (
                  <>
                    {profile?.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-sm tracking-widest uppercase font-medium min-h-[44px] flex items-center gap-3 text-ink hover:text-gold-ink"
                      >
                        <User size={16} /> Admin Panel
                      </Link>
                    )}
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 text-sm tracking-widest uppercase font-medium min-h-[44px] flex items-center gap-3 text-ink hover:text-gold-ink"
                    >
                      <User size={16} /> My Account
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 text-sm tracking-widest uppercase font-medium min-h-[44px] flex items-center gap-3 text-ink hover:text-gold-ink"
                  >
                    <User size={16} /> Sign In
                  </Link>
                )}
              </nav>
            </div>

            <div className="pt-6 border-t border-hairline text-xs text-ink-soft">
              <p>© {new Date().getFullYear()} {brand}. Modern appliqué, worn today.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
