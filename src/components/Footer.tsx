'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';

export const Footer: React.FC = () => {
  const { data } = useContent();
  const contact = data.contactInfo || {
    storeName: 'Gaurangi',
    tagline: 'Contemporary womenswear built on hand-cut Pipili appliqué.',
    address: 'Bhubaneswar · Delhi',
    email: 'hello@gaurangi.in',
  };

  return (
    <footer className="pt-12 md:pt-16 pb-8 text-[13px] text-ink-soft font-sans">
      <div className="wrap">
        <div className="foot-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-border-hair">
          <div>
            <span className="logotype text-lg text-ink">{contact.storeName}</span>
            <p className="mt-4 max-w-[280px]">{contact.tagline}</p>
          </div>

          <div>
            <h4 className="mono text-ink mb-3.5">Shop</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><Link href="/shop" className="hover:text-rose">The Edit</Link></li>
              <li><Link href="/shop?technique=floral-vine" className="hover:text-rose">By Technique</Link></li>
              <li><Link href="/shop?category=Suit+Sets" className="hover:text-rose">Suit Sets</Link></li>
              <li><Link href="/shop?category=Dupattas" className="hover:text-rose">Dupattas</Link></li>
              <li><Link href="/shop?category=Home+%26+Bedding" className="hover:text-rose">Home &amp; Bedding</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mono text-ink mb-3.5">About</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><Link href="/craft" className="hover:text-rose">The Craft</Link></li>
              <li><Link href="/craft#artisans" className="hover:text-rose">Artisans</Link></li>
              <li><Link href="/shop" className="hover:text-rose">Fit Guide</Link></li>
              <li><Link href="/shop" className="hover:text-rose">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mono text-ink mb-3.5">Contact</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-rose">
                  {contact.email}
                </a>
              </li>
              <li>{contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom flex flex-wrap justify-between items-center pt-6 gap-2.5">
          <span>© {new Date().getFullYear()} {contact.storeName}. Draft homepage — copy and prices to be finalized.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
};
