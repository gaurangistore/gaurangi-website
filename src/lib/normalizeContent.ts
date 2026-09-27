/**
 * Content normalization.
 *
 * Firestore holds hand-edited, historical documents, so anything read from it
 * has to be treated as untrusted: prices may still be display strings, items
 * may be missing ids, and optional blocks may be absent or `null`. Components
 * and contexts rely on the normalized shape instead of re-deriving it, which
 * keeps legacy documents working without a manual data migration.
 *
 * Normalization is pure and idempotent — running it twice yields the same
 * result — so it is safe to call on every load and on every admin save.
 */

import {
  HomepageData,
  ProductItem,
  DEFAULT_HOMEPAGE_DATA,
  SectionVisibility,
  SectionKey,
  SectionOrderItem,
  SiteContactInfo,
  ServiceItem,
  DEFAULT_SECTION_ORDER,
} from '@/lib/contentDefaults';
import { parseLegacyPrice } from '@/lib/price';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** Coerces to a trimmed string, falling back when the value is unusable. */
const asString = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return fallback;
};

const asArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

/** Stable id from an index, used when an item arrives without one. */
const fallbackId = (index: number, prefix: string): string => `${prefix}-${index + 1}`;

/**
 * Normalizes one product.
 *
 * `price` and `mrp` are coerced to numbers so cart maths, discounts and sorting
 * never operate on strings. An `mrp` below `price` is dropped rather than
 * rendered, since that produces a negative discount.
 */
export const normalizeProduct = (input: unknown, index = 0): ProductItem => {
  const raw = isRecord(input) ? input : {};

  const price = parseLegacyPrice(raw.price as string | number | null) ?? 0;
  const rawMrp = parseLegacyPrice(raw.mrp as string | number | null);
  const mrp = rawMrp !== null && rawMrp > price ? rawMrp : undefined;

  return {
    ...raw,
    id: asString(raw.id, fallbackId(index, 'product')),
    name: asString(raw.name, 'Untitled product'),
    fabric: asString(raw.fabric),
    price,
    ...(mrp !== undefined ? { mrp } : {}),
    image: asString(raw.image),
    category: asString(raw.category, 'Uncategorised'),
    technique: asString(raw.technique) || undefined,
    description: asString(raw.description) || undefined,
    badge: asString(raw.badge) || undefined,
    craft: asString(raw.craft) || undefined,
    washCare: asString(raw.washCare) || undefined,
  } as ProductItem;
};

/** Normalizes the category list, dropping blank names and duplicate ids. */
const normalizeCategories = (input: unknown) => {
  const seen = new Set<string>();
  return asArray(input)
    .filter((item): item is Record<string, unknown> => isRecord(item))
    .map((raw, index) => {
      const name = asString(raw.name).trim();
      let id = asString(raw.id).trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (!id) id = fallbackId(index, 'category');
      // Keep ids unique; the shop page uses them as filter keys and link params.
      let unique = id;
      let suffix = 2;
      while (seen.has(unique)) {
        unique = `${id}-${suffix++}`;
      }
      seen.add(unique);
      return { ...raw, id: unique, name, image: asString(raw.image) };
    })
    .filter((category) => category.name.length > 0);
};

/**
 * Legacy boolean flag per section, keyed the same way as `SectionKey`.
 * Kept so existing documents keep controlling the same sections.
 */
const LEGACY_HIDDEN_TO_KEY: Record<string, SectionKey> = {
  heroBanner: 'hero',
  featuredCategories: 'categories',
  newArrivals: 'newArrivals',
  whyGaurangi: 'whyGaurangi',
  customerStories: 'stories',
  craftSection: 'craft',
  artisansSection: 'artisans',
};

const SECTION_KEYS = new Set<string>(DEFAULT_SECTION_ORDER.map((item) => item.key));

const isSectionKey = (value: unknown): value is SectionKey =>
  typeof value === 'string' && SECTION_KEYS.has(value);

/**
 * Resolves the render order.
 *
 * A document with no `sectionOrder` (every pre-Phase-2 document) is migrated
 * from its `hiddenSections` flags, so existing visibility choices carry over.
 * Unknown keys are dropped and missing defaults appended, so a typo in the
 * admin cannot remove a section from the page.
 */
const normalizeSectionOrder = (order: unknown, hidden: SectionVisibility): SectionOrderItem[] => {
  const defaults = DEFAULT_SECTION_ORDER;

  if (!Array.isArray(order) || order.length === 0) {
    return defaults.map((item) => {
      const flag = legacyFlagFor(item.key);
      const wasHidden = flag !== null && hidden[flag] === true;
      return { ...item, visible: wasHidden ? false : item.visible };
    });
  }

  const seen = new Set<SectionKey>();
  const resolved: SectionOrderItem[] = [];

  for (const raw of order) {
    if (!isRecord(raw) || !isSectionKey(raw.key) || seen.has(raw.key)) continue;
    seen.add(raw.key);
    resolved.push({
      key: raw.key,
      visible: typeof raw.visible === 'boolean' ? raw.visible : true,
      ...(typeof raw.startDate === 'string' ? { startDate: raw.startDate } : {}),
      ...(typeof raw.endDate === 'string' ? { endDate: raw.endDate } : {}),
    });
  }

  // Append anything the author did not mention, so newly added sections appear
  // instead of silently never rendering.
  for (const item of defaults) {
    if (!seen.has(item.key)) resolved.push({ ...item });
  }

  return resolved;
};

/** Reverse lookup used only while migrating legacy flags. */
const legacyFlagFor = (key: SectionKey): keyof SectionVisibility | null => {
  for (const [flag, flagKey] of Object.entries(LEGACY_HIDDEN_TO_KEY)) {
    if (flagKey === key) return flag as keyof SectionVisibility;
  }
  return null;
};

/** Guarantees each service has an id, a title and a body before it renders. */
const normalizeServices = (input: unknown): ServiceItem[] =>
  asArray(input)
    .filter((item): item is Record<string, unknown> => isRecord(item))
    .map((raw, index) => ({
      ...raw,
      id: asString(raw.id, fallbackId(index, 'service')),
      title: asString(raw.title),
      description: asString(raw.description),
      ...(asString(raw.iconName) ? { iconName: asString(raw.iconName) } : {}),
    })) as ServiceItem[];

/** Fills in every visibility flag so callers can read it without `??`. */
const normalizeVisibility = (input: unknown): SectionVisibility => {
  const raw = isRecord(input) ? (input as SectionVisibility) : {};
  const keys = Object.keys(DEFAULT_HOMEPAGE_DATA.hiddenSections || {}) as (keyof SectionVisibility)[];
  const out: SectionVisibility = { ...raw };
  for (const key of keys) {
    if (typeof out[key] !== 'boolean') out[key] = false;
  }
  return out;
};

/**
 * Normalizes a full content document.
 *
 * Unknown top-level keys are preserved so admin-authored fields added later are
 * not silently dropped on the next save. Known blocks are rebuilt defensively so
 * a partially broken document degrades to defaults instead of crashing render.
 */
export const normalizeContent = (input: unknown): HomepageData => {
  const raw = isRecord(input) ? input : {};
  const defaults = DEFAULT_HOMEPAGE_DATA;

  const contactRaw = isRecord(raw.contactInfo) ? raw.contactInfo : {};
  const contactInfo: SiteContactInfo = {
    storeName: asString(contactRaw.storeName, defaults.contactInfo.storeName),
    tagline: asString(contactRaw.tagline, defaults.contactInfo.tagline),
    address: asString(contactRaw.address, defaults.contactInfo.address),
    phone: asString(contactRaw.phone, defaults.contactInfo.phone),
    email: asString(contactRaw.email, defaults.contactInfo.email),
    instagram: asString(contactRaw.instagram, defaults.contactInfo.instagram),
    ...(asString(contactRaw.logoImage) ? { logoImage: asString(contactRaw.logoImage) } : {}),
    ...(asString(contactRaw.logoIcon) ? { logoIcon: asString(contactRaw.logoIcon) } : {}),
  };

  const hiddenSections = normalizeVisibility(raw.hiddenSections);

  return {
    ...raw,
    hiddenSections,
    sectionOrder: normalizeSectionOrder(raw.sectionOrder, hiddenSections),
    services: normalizeServices(raw.services),
    // The remaining blocks are passthrough: they are either fully optional or
    // already consumed through dedicated editors, and they are cast below
    // because the cast is deliberate — the goal is to guarantee prices, ids and
    // visibility flags, not to re-validate every section's field list here.
    heroSlides: asArray(raw.heroSlides) as HomepageData['heroSlides'],
    collections: asArray(raw.collections) as HomepageData['collections'],
    products: asArray(raw.products).map(normalizeProduct),
    occasions: asArray(raw.occasions) as HomepageData['occasions'],
    categories: normalizeCategories(raw.categories) as HomepageData['categories'],
    customerStories: asArray(raw.customerStories) as HomepageData['customerStories'],
    contactInfo,
  } as unknown as HomepageData;
};

/** True when normalization would change the document, i.e. a migration is pending. */
export const needsNormalization = (input: unknown): boolean => {
  if (!isRecord(input)) return true;
  return asArray(input.products).some((item) => {
    if (!isRecord(item)) return true;
    if (typeof item.price !== 'number') return true;
    if (item.mrp !== undefined && typeof item.mrp !== 'number') return true;
    return false;
  });
};
