'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useContent } from '@/context/ContentContext';

export default function CraftPage() {
  const { data } = useContent();
  const craft = data.craftPageContent;
  const steps = craft?.steps || [];

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-14 md:py-20">
          <div className="wrap">
            <div className="max-w-[760px]">
              <span className="mono text-rose block mb-4">{craft?.heroBadge || 'The Craft'}</span>
              <h1 className="font-display italic text-[clamp(36px,5.5vw,64px)] leading-[1.05]">
                {craft?.heroTitle || 'Applied, not printed. Layered, not flat.'}
              </h1>
              <p className="max-w-[640px] mt-6 text-ink-soft text-[17px]">
                {craft?.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* What is Pipili appliqué */}
        <section className="py-12 md:py-16 bg-paper border-y border-border-hair">
          <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <span className="mono text-rose block mb-3">01</span>
              <h2 className="font-display italic text-[clamp(28px,3.4vw,40px)]">
                {craft?.whatIsTitle || 'What is Pipili appliqué?'}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-ink-soft text-[16px] max-w-[620px]">{craft?.whatIsBody}</p>
            </div>
          </div>
        </section>

        {/* How it's made — 6 steps */}
        <section className="py-14 md:py-20">
          <div className="wrap">
            <div className="mb-10 md:mb-12">
              <span className="mono text-rose block mb-3">
                {craft?.processBadge || 'From Cloth to Finished Piece'}
              </span>
              <h2 className="font-display italic text-[clamp(30px,3.8vw,44px)]">
                {craft?.processTitle || 'How it\u2019s made'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map((step) => (
                <div key={step.number} className="bg-paper p-7 md:p-8 border border-border-hair">
                  <span className="mono text-rose block mb-3">{step.number}</span>
                  <h3 className="text-lg font-sans font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-ink-soft">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workshops of Pipili */}
        <section id="artisans" className="py-12 md:py-16 bg-ink text-paper">
          <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="mono text-gold block mb-3">The Workshops of Pipili</span>
              <h2 className="font-display italic text-[clamp(28px,3.4vw,40px)] mb-4">
                {craft?.workshopsTitle}
              </h2>
              <p className="text-paper/75 max-w-[520px] text-[15px]">{craft?.workshopsBody}</p>
            </div>
            <div className="bg-paper/5 border border-paper/15 p-8 md:p-10">
              <span className="mono text-gold block mb-3">Why We Name the Workshop</span>
              <h3 className="font-display italic text-2xl mb-3">{craft?.artisansTitle}</h3>
              <p className="text-paper/75 text-sm max-w-[520px]">{craft?.artisansBody}</p>
            </div>
          </div>
        </section>

        {/* Why hand-cut matters + CTA */}
        <section className="py-14 md:py-20">
          <div className="wrap text-center">
            <span className="mono text-rose block mb-3">Why Hand-Cut Matters</span>
            <h2 className="font-display italic text-[clamp(26px,3.2vw,38px)] max-w-[640px] mx-auto mb-4">
              {craft?.handCutTitle}
            </h2>
            <p className="max-w-[520px] mx-auto text-ink-soft text-[15px]">{craft?.handCutBody}</p>

            <div className="mt-10">
              <span className="mono text-ink-soft block mb-4">{craft?.ctaTitle}</span>
              <Link href="/shop" className="btn-primary">
                {craft?.ctaLinkText || 'Explore the Edit'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
