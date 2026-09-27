'use client';

import React from 'react';
import { getImageUrl } from '@/lib/constants';

/**
 * Brand logo.
 *
 * The real transparent-background logo has not been supplied yet, so this
 * renders a typographic placeholder. Once the master logo is uploaded in the
 * admin (Contact & Footer -> Logo), it is referenced by `contactInfo.logoImage`
 * and takes over automatically — no code change required.
 *
 * `contactInfo.logoImage` and `contactInfo.logoIcon` are optional and are added
 * to the content schema in a later phase; reading them defensively here means
 * the component works before and after that migration.
 */

type LogoVariant = 'horizontal' | 'stacked' | 'icon';

interface LogoSource {
  logoImage?: string;
  logoIcon?: string;
  storeName?: string;
}

interface BrandLogoProps {
  brand?: LogoSource;
  variant?: LogoVariant;
  /** Tailwind text colour class applied to the wordmark. */
  className?: string;
  /** Renders the wordmark in gold instead of ink. Used on dark footers. */
  tone?: 'ink' | 'gold';
}

const GOLD_TONE: Record<'ink' | 'gold', string> = {
  ink: 'text-ink',
  gold: 'text-gold',
};

const MONOGRAM_TONE: Record<'ink' | 'gold', string> = {
  ink: 'border-gold text-gold-ink',
  gold: 'border-gold/60 text-gold',
};

/** "Gaurangi" -> "GAURANGI", with "Gaurangi Collections" -> "GAURANGI COLLECTIONS". */
const toWordmark = (storeName?: string): string =>
  (storeName || 'Gaurangi').trim().toUpperCase();

export const BrandLogo: React.FC<BrandLogoProps> = ({
  brand,
  variant = 'horizontal',
  className = '',
  tone = 'ink',
}) => {
  const wordmark = toWordmark(brand?.storeName);
  const monogram = wordmark
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2);

  const iconSrc = brand?.logoIcon;
  const horizontalSrc = brand?.logoImage;
  const textTone = GOLD_TONE[tone];

  if (variant === 'icon') {
    if (iconSrc) {
      return (
        <img
          src={getImageUrl(iconSrc)}
          alt={brand?.storeName || 'Gaurangi'}
          className={`h-9 w-auto ${className}`}
        />
      );
    }
    return (
      <span
        aria-label={brand?.storeName || 'Gaurangi'}
        role="img"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border font-display text-[0.95rem] font-medium tracking-[0.08em] ${MONOGRAM_TONE[tone]} ${className}`}
      >
        {monogram}
      </span>
    );
  }

  if (variant === 'stacked' && !horizontalSrc) {
    return (
      <span
        className={`flex flex-col items-center gap-1.5 ${className}`}
        title="Placeholder logo — replace with the master logo asset"
      >
        <span
          aria-label={brand?.storeName || 'Gaurangi'}
          role="img"
          className={`inline-flex h-14 w-14 items-center justify-center rounded-full border font-display text-lg font-medium tracking-[0.08em] ${MONOGRAM_TONE[tone]}`}
        >
          {monogram}
        </span>
        <span className={`logotype text-base ${textTone}`}>{wordmark}</span>
        <span className="mono text-[0.6rem] text-gold-ink">Collections</span>
      </span>
    );
  }

  if (horizontalSrc) {
    return (
      <img
        src={getImageUrl(horizontalSrc)}
        alt={brand?.storeName || 'Gaurangi'}
        className={`h-8 w-auto md:h-9 ${className}`}
      />
    );
  }

  // Placeholder wordmark. The gold rule underneath marks this as the spot the
  // real logo belongs, so it is obviously provisional to anyone reviewing it.
  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className}`}
      title="Placeholder logo — replace with the master logo asset"
    >
      <span className={`logotype text-[1.05rem] md:text-lg ${textTone}`}>
        {wordmark}
      </span>
      <span className="mt-1 block h-px w-full min-w-[7.5rem] bg-gold" />
      <span className="mono mt-1 text-[0.55rem] text-gold-ink">Collections</span>
    </span>
  );
};
