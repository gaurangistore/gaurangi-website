// Canonical origin for the deployed site. Derived from the git remote
// (gaurangistore/gaurangi-website) plus the production `basePath` in
// next.config.ts, so it must be kept in sync if either changes.
const GITHUB_ORIGIN = 'https://gaurangistore.github.io';

export const SITE_PATH = '/gaurangi-website';

export const SITE_URL = `${GITHUB_ORIGIN}${SITE_PATH}`;

export const SITE_NAME = 'Gaurangi';

export const BRAND_TAGLINE = 'Crafted with Tradition. Styled for Today.';

/** Joins the site origin with an in-site path, respecting the basePath. */
export const absoluteUrl = (path: string): string => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
};
