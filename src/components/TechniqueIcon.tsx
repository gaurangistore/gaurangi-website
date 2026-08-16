import React from 'react';

interface TechniqueIconProps {
  technique: string;
  className?: string;
}

const PATHS: Record<string, React.ReactNode> = {
  'floral-vine': (
    <>
      <path
        d="M14 54 C14 30 24 24 24 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="text-emerald"
      />
      <path
        d="M24 18 L16 12 M24 26 L32 20 M24 34 L16 28 M24 42 L32 36"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-emerald"
      />
      <circle cx="24" cy="10" r="5" fill="currentColor" className="text-rose" />
    </>
  ),
  cutwork: (
    <>
      <rect
        x="14"
        y="14"
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="text-gold"
      />
      <path d="M22 22 L42 42 M42 22 L22 42" stroke="currentColor" strokeWidth="3" className="text-gold" />
    </>
  ),
  'floral-wreath': (
    <>
      <circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" strokeWidth="3" className="text-rose" />
      <circle cx="32" cy="14" r="5" fill="currentColor" className="text-rose" />
      <circle cx="50" cy="32" r="5" fill="currentColor" className="text-rose" />
      <circle cx="32" cy="50" r="5" fill="currentColor" className="text-rose" />
      <circle cx="14" cy="32" r="5" fill="currentColor" className="text-rose" />
    </>
  ),
  'beaded-trail': (
    <>
      <path d="M12 32 Q22 18 32 32 T52 32" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald" />
      <circle cx="12" cy="32" r="3" fill="currentColor" className="text-gold" />
      <circle cx="22" cy="24" r="3" fill="currentColor" className="text-gold" />
      <circle cx="32" cy="32" r="3" fill="currentColor" className="text-gold" />
      <circle cx="42" cy="24" r="3" fill="currentColor" className="text-gold" />
      <circle cx="52" cy="32" r="3" fill="currentColor" className="text-gold" />
    </>
  ),
  'paisley-cutwork': (
    <>
      <path d="M32 10 C50 10 50 40 32 54 C14 40 14 10 32 10 Z" fill="currentColor" opacity="0.85" className="text-gold" />
    </>
  ),
};

export const TechniqueIcon: React.FC<TechniqueIconProps> = ({ technique, className = '' }) => {
  const body = PATHS[technique] || PATHS['floral-vine'];
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {body}
    </svg>
  );
};
