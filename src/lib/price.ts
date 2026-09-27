/**
 * Price helpers.
 *
 * Products historically stored `price` as a display string ("₹ 2,800"). The
 * content schema is migrating to numeric `price` / `mrp` so discount maths and
 * cart totals are real numbers rather than regex-scraped text. These helpers
 * keep both representations working during and after that migration.
 */

/** Formats a number as Indian-style currency, e.g. 1499 -> "₹1,499". */
export const formatINR = (value?: number | null): string => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '';
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
};

/**
 * Extracts a number from a legacy price string.
 * "₹ 2,800" -> 2800, "Rs. 1,499/-" -> 1499.
 */
export const parseLegacyPrice = (value?: string | number | null): number | null => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string' || !value.trim()) return null;

  // Drop everything except digits and separators, then normalise separators.
  const cleaned = value.replace(/[^\d.,]/g, '').replace(/,/g, '');
  if (!cleaned) return null;

  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
};

/** Picks the numeric price from a product that may still hold a legacy string. */
export const resolvePrice = (product: { price?: number | string; mrp?: number | string } | null | undefined): number => {
  if (!product) return 0;
  return parseLegacyPrice(product.price) ?? 0;
};

/** Picks the numeric MRP from a product that may still hold a legacy string. */
export const resolveMrp = (product: { price?: number | string; mrp?: number | string } | null | undefined): number => {
  if (!product) return 0;
  return parseLegacyPrice(product.mrp) ?? 0;
};

/**
 * Discount off the MRP, as a whole percentage.
 * Returns null when there is no genuine saving, so callers can decide whether
 * to show a discount badge rather than rendering "0% OFF".
 */
export const discountPercent = (price?: number, mrp?: number): number | null => {
  if (!price || !mrp || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
};

/** True when the product is on sale. */
export const isOnSale = (price?: number, mrp?: number): boolean => discountPercent(price, mrp) !== null;
