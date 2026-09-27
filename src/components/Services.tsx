'use client';

import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Truck,
  Ruler,
  type LucideIcon,
} from 'lucide-react';
import { useContent } from '@/context/ContentContext';

/**
 * Service promises.
 *
 * A four-up grid of how-the-brand-works points, sitting between the emotional
 * sections so the page has a practical beat as well as a lyrical one.
 */

/** Icon names are authored in the CMS, so the mapping is by explicit allowlist
 *  rather than a dynamic import: an unknown name falls back instead of
 *  throwing during render. */
const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Truck,
  Ruler,
};

const FALLBACK_ICON = CheckCircle2;

export const Services: React.FC = () => {
  const { data } = useContent();
  const header = data.sectionHeaders || {};
  const services = data.services || [];

  if (services.length === 0) return null;

  return (
    <section id="services" className="py-16 md:py-20 bg-taupe-soft">
      <div className="wrap">
        <div className="section-head mb-10 md:mb-12">
          {header.servicesBadge && (
            <span className="mono text-gold-ink mb-2.5 block">{header.servicesBadge}</span>
          )}
          <h2 className="font-display italic text-[clamp(30px,3.6vw,44px)] max-w-[560px]">
            {header.servicesTitle || 'What you can expect'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {services.map((service) => {
            const Icon = ICONS[service.iconName || ''] || FALLBACK_ICON;
            return (
              <div key={service.id} className="bg-paper p-7 flex flex-col gap-3">
                <span className="w-11 h-11 rounded-full border border-gold text-gold-ink flex items-center justify-center shrink-0">
                  <Icon size={19} strokeWidth={1.5} />
                </span>
                <h3 className="text-base font-sans font-semibold leading-snug">{service.title}</h3>
                {service.description && (
                  <p className="text-[13px] text-ink-soft leading-relaxed">{service.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
