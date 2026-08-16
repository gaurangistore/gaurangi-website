import { DUMMY_IMAGE } from '@/lib/constants';

// Types for all Homepage Sections
export interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  italicTitle: string;
  tagline: string;
  weave: string;
  craft: string;
  occasion: string;
  image: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export interface ProductItem {
  id: string;
  name: string;
  fabric: string;
  price: string;
  image: string;
  category: string;
  technique?: string;
  topMetres?: string;
  bottomFabric?: string;
  bottomMetres?: string;
  dupattaFabric?: string;
  dupattaMetres?: string;
  craft?: string;
  washCare?: string;
  badge?: string;
  description?: string;
  rating?: string;
  reviewsCount?: string;
}

export interface OccasionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  gridSpan: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  count: string;
  image: string;
  description: string;
}

export interface CustomerStoryItem {
  id: string;
  name: string;
  location: string;
  quote: string;
  image: string;
  occasion: string;
}

export interface SiteContactInfo {
  storeName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
}

export interface SectionVisibility {
  heroBanner?: boolean;
  featuredCategories?: boolean;
  newArrivals?: boolean;
  whyGaurangi?: boolean;
  customerStories?: boolean;
  newsletter?: boolean;
  craftSection?: boolean;
  artisansSection?: boolean;
}

export interface DressMaterialsPageContent {
  bannerTitle: string;
  bannerSubtitle: string;
  fabrics: string[];
}

export interface ProductPageSettings {
  specsSectionTitle?: string;
  defaultTopMetres: string;
  defaultBottomMetres: string;
  defaultDupattaMetres: string;
  defaultWashCare: string;
  shippingPolicyText: string;
  returnPolicyText: string;
  whatsAppNumber: string;
}

export interface AboutPageContent {
  ethosTitle: string;
  ethosSubtitle: string;
  heritageNarrative: string;
}

export interface CraftStepItem {
  number: string;
  title: string;
  description: string;
}

export interface CraftPageContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  whatIsTitle: string;
  whatIsBody: string;
  processTitle: string;
  processBadge: string;
  steps: CraftStepItem[];
  workshopsTitle: string;
  workshopsBody: string;
  workshopsLinkText: string;
  artisansTitle: string;
  artisansBody: string;
  handCutTitle: string;
  handCutBody: string;
  ctaTitle: string;
  ctaLinkText: string;
}

export interface SectionHeaderConfig {
  categoriesBadge?: string;
  categoriesTitle?: string;
  categoriesLinkText?: string;
  categoriesLinkUrl?: string;

  newArrivalsBadge?: string;
  newArrivalsTitle?: string;
  newArrivalsLinkText?: string;
  newArrivalsLinkUrl?: string;

  whyGaurangiBadge?: string;
  whyGaurangiTitle?: string;

  reviewsBadge?: string;
  reviewsTitle?: string;
}

export interface TrustPillarItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface HomepageData {
  hiddenSections?: SectionVisibility;
  sectionHeaders?: SectionHeaderConfig;
  heroSlides: HeroSlide[];
  collections: CollectionItem[];
  products: ProductItem[];
  occasions: OccasionItem[];
  categories: CategoryItem[];
  whyGaurangiPillars?: TrustPillarItem[];
  customerStories: CustomerStoryItem[];
  contactInfo: SiteContactInfo;
  dressMaterialsPageContent?: DressMaterialsPageContent;
  productPageSettings?: ProductPageSettings;
  aboutPageContent?: AboutPageContent;
  craftPageContent?: CraftPageContent;
}

// Default Fallback Initial Content
export const DEFAULT_HOMEPAGE_DATA: HomepageData = {
  hiddenSections: {
    heroBanner: false,
    featuredCategories: false,
    newArrivals: false,
    whyGaurangi: false,
    customerStories: false,
    newsletter: false,
    craftSection: false,
    artisansSection: false,
  },
  whyGaurangiPillars: [
    {
      id: 'p1',
      title: 'Hand-cut, not laser-cut',
      description: 'Every motif is cut freehand by a Pipili artisan — no two pieces are identical.',
      iconName: 'Sparkles',
    },
    {
      id: 'p2',
      title: 'True-to-size fit',
      description: "Each style is fit-tested across sizes XS–3XL before it's listed, not after complaints.",
      iconName: 'ShieldCheck',
    },
    {
      id: 'p3',
      title: 'Colorfast fabric',
      description: "Base cloth and motif fabric are tested together so colour won't bleed on a first wash.",
      iconName: 'CheckCircle2',
    },
    {
      id: 'p4',
      title: '7-day returns',
      description: 'Not the right drape or shade on you? Send it back within 7 days, no questions asked.',
      iconName: 'RefreshCw',
    },
  ],
  sectionHeaders: {
    categoriesBadge: 'Five Techniques, Straight From Our Workshop Floor',
    categoriesTitle: 'Shop by technique',
    categoriesLinkText: 'See all pieces',
    categoriesLinkUrl: '/shop',

    newArrivalsBadge: 'Straight From the Workshop',
    newArrivalsTitle: 'New arrivals',
    newArrivalsLinkText: 'View the full edit',
    newArrivalsLinkUrl: '/shop',

    whyGaurangiBadge: 'The Gaurangi Promise',
    whyGaurangiTitle: 'Why It Feels Different in the Hand',

    reviewsBadge: 'In Their Words',
    reviewsTitle: 'Style notes',
  },
  dressMaterialsPageContent: {
    bannerTitle: 'The Gaurangi Edit',
    bannerSubtitle: 'Suit sets, dupattas and home textiles — every piece built on hand-cut Pipili appliqué.',
    fabrics: ['All', 'Suit Sets', 'Dupattas', 'Home & Bedding'],
  },
  productPageSettings: {
    specsSectionTitle: 'About This Piece',
    defaultTopMetres: 'Included',
    defaultBottomMetres: 'Included',
    defaultDupattaMetres: 'Included',
    defaultWashCare: 'Gentle wash cold, inside out',
    shippingPolicyText: 'Free shipping across India',
    returnPolicyText: 'Easy 7-day returns',
    whatsAppNumber: '+919876543210',
  },
  aboutPageContent: {
    ethosTitle: 'The Gaurangi Ethos',
    ethosSubtitle: 'Modern appliqué, worn today.',
    heritageNarrative: 'Gaurangi takes the hand-cut appliqué of Pipili — once reserved for temple canopies — and puts it back into an everyday wardrobe. Not a costume version of tradition. Just tradition, cut for how you actually dress.',
  },
  craftPageContent: {
    heroBadge: 'The Craft',
    heroTitle: 'Applied, not printed. Layered, not flat.',
    heroSubtitle: 'Embroidery stitches thread onto one layer of fabric. Appliqué is slower: a second piece of cloth is cut by hand into shape, placed on top, then stitched down — usually finished with fine embroidery along the edge. That\u2019s the raised edge you feel before you even look — and why a Gaurangi piece never sits quite flat under your fingers the way a printed one does.',
    whatIsTitle: 'What is Pipili appliqué?',
    whatIsBody: 'Chandua appliqué is the storied craft of Pipili, a town outside Bhubaneswar in Odisha. For generations, its artisans hand-cut and layered cloth to build the appliqué canopies of the Jagannath tradition — temple canopies and ceremonial umbrellas. Gaurangi works with the same hands and the same technique, cut into pieces you\u2019d actually wear to work on a Tuesday.',
    processTitle: 'How it\u2019s made',
    processBadge: 'From Cloth to Finished Piece',
    steps: [
      { number: '01', title: 'Base cloth', description: 'A clean, colorfast base fabric is chosen and pre-washed for the finished garment or textile.' },
      { number: '02', title: 'Motif cutting', description: 'A second fabric is cut freehand by a Pipili artisan into the motif shape — no stencils, no lasers.' },
      { number: '03', title: 'Placement', description: 'The cut motif is placed on the base cloth and held for stitching, layer by layer.' },
      { number: '04', title: 'Edge stitch', description: 'The shape is stitched down, usually finished with fine embroidery along the edge.' },
      { number: '05', title: 'Detailing', description: 'Beads, sequins or cutwork are added by hand to complete the technique.' },
      { number: '06', title: 'Check & finish', description: 'Every piece is inspected for colour bleed, fit and finish before it is listed.' },
    ],
    workshopsTitle: 'The workshops of Pipili',
    workshopsBody: 'This town outside Bhubaneswar has practiced chandua appliqué for generations — first for temple canopies and ceremonial umbrellas, now cut into pieces you\u2019d actually wear to work on a Tuesday.',
    workshopsLinkText: 'Read the full story',
    artisansTitle: 'A name behind every piece',
    artisansBody: 'Placeholder copy — once you tell us which workshop or artisan group supplies each collection, this space can credit them directly: their name, their town, a short note on their specialty. It\u2019s the one thing a fast-fashion copy can\u2019t fake.',
    handCutTitle: 'Why hand-cut matters',
    handCutBody: 'A laser repeats the same shape a thousand times. A hand stays just imperfect enough to stay alive — and to prove where the piece came from.',
    ctaTitle: 'See the techniques in real pieces',
    ctaLinkText: 'Explore the Edit',
  },
  heroSlides: [
    {
      id: 1,
      badge: 'For the Woman Who Wears Both',
      title: 'Heritage,',
      italicTitle: 'worn your way.',
      tagline: 'Gaurangi takes the hand-cut appliqué of Pipili — once reserved for temple canopies — and puts it back into an everyday wardrobe. Not a costume version of tradition. Just tradition, cut for how you actually dress.',
      weave: 'Hand-cut, not printed',
      craft: 'Sizes XS–3XL',
      occasion: 'Suit sets, dupattas & home textiles',
      image: DUMMY_IMAGE,
    },
  ],
  collections: [
    {
      id: 'floral-vine',
      title: 'Floral Vine',
      subtitle: 'Sinuous hand-cut vines across cotton and Kota.',
      image: DUMMY_IMAGE,
      tag: 'Suit Sets',
    },
    {
      id: 'cutwork',
      title: 'Cutwork',
      subtitle: 'Geometric cutwork with a fine crochet edge.',
      image: DUMMY_IMAGE,
      tag: 'Dupattas',
    },
    {
      id: 'floral-wreath',
      title: 'Floral Wreath',
      subtitle: 'Appliqué wreaths for bedsheet sets and bedding.',
      image: DUMMY_IMAGE,
      tag: 'Home & Bedding',
    },
    {
      id: 'beaded-trail',
      title: 'Beaded Trail',
      subtitle: 'Pearl and sequin trails along an appliqué wave.',
      image: DUMMY_IMAGE,
      tag: 'Suit Sets',
    },
    {
      id: 'paisley-cutwork',
      title: 'Paisley Cutwork',
      subtitle: 'Classic paisley cutwork for dupatta borders.',
      image: DUMMY_IMAGE,
      tag: 'Dupattas',
    },
  ],
  products: [
    {
      id: 'sky-blue-floral-applique-suit-set',
      name: 'Sky Blue Floral Appliqué Suit Set',
      fabric: 'Cotton',
      price: '₹ 2,800',
      image: DUMMY_IMAGE,
      category: 'Suit Sets',
      technique: 'floral-vine',
      topMetres: 'Included',
      bottomMetres: 'Included',
      dupattaMetres: 'Included',
      craft: 'Hand-cut floral vine appliqué',
      washCare: 'Gentle wash cold, inside out',
      badge: 'New',
      description: 'Cotton · hand-cut floral vine appliqué, dupatta included.',
    },
    {
      id: 'mauve-floral-applique-suit-set',
      name: 'Mauve Floral Appliqué Suit Set',
      fabric: 'Kota cotton',
      price: '₹ 3,400',
      image: DUMMY_IMAGE,
      category: 'Suit Sets',
      technique: 'floral-vine',
      topMetres: 'Included',
      bottomMetres: 'Included',
      dupattaMetres: 'Included',
      craft: 'Appliqué floral yoke',
      washCare: 'Gentle wash cold, inside out',
      badge: 'New',
      description: 'Kota cotton · appliqué floral yoke, matching dupatta.',
    },
    {
      id: 'butter-yellow-beaded-applique-suit-set',
      name: 'Butter Yellow Beaded Appliqué Suit Set',
      fabric: 'Cotton',
      price: '₹ 3,200',
      image: DUMMY_IMAGE,
      category: 'Suit Sets',
      technique: 'beaded-trail',
      topMetres: 'Included',
      bottomMetres: 'Included',
      dupattaMetres: 'Included',
      craft: 'Pearl bead detailing',
      washCare: 'Gentle wash cold, inside out',
      badge: 'New',
      description: 'Cotton · hand-cut appliqué with pearl bead detailing.',
    },
    {
      id: 'ivory-tonal-cutwork-suit-set',
      name: 'Ivory Tonal Cutwork Suit Set',
      fabric: 'Kota cotton',
      price: '₹ 3,000',
      image: DUMMY_IMAGE,
      category: 'Suit Sets',
      technique: 'cutwork',
      topMetres: 'Included',
      bottomMetres: 'Included',
      dupattaMetres: 'Included',
      craft: 'Tonal gold cutwork appliqué, crochet edge',
      washCare: 'Gentle wash cold, inside out',
      badge: 'New',
      description: 'Kota cotton · tonal gold cutwork appliqué, crochet edge.',
    },
    {
      id: 'pale-yellow-sequin-applique-suit-set',
      name: 'Pale Yellow Sequin Appliqué Suit Set',
      fabric: 'Cotton',
      price: '₹ 3,300',
      image: DUMMY_IMAGE,
      category: 'Suit Sets',
      technique: 'beaded-trail',
      topMetres: 'Included',
      bottomMetres: 'Included',
      dupattaMetres: 'Included',
      craft: 'Sequin and bead trail',
      washCare: 'Gentle wash cold, inside out',
      badge: 'New',
      description: 'Cotton · sequin and bead trail along an appliqué wave.',
    },
    {
      id: 'pink-teal-cutwork-dupatta-set',
      name: 'Pink & Teal Cutwork Dupatta Set',
      fabric: 'Kota cotton',
      price: '₹ 1,600',
      image: DUMMY_IMAGE,
      category: 'Dupattas',
      technique: 'cutwork',
      topMetres: 'Included',
      dupattaMetres: 'Included',
      craft: 'Geometric cutwork appliqué border',
      washCare: 'Gentle wash cold, inside out',
      badge: 'New',
      description: 'Kota cotton · geometric cutwork appliqué border.',
    },
    {
      id: 'navy-floral-applique-bedsheet-set',
      name: 'Navy Floral Appliqué Bedsheet Set',
      fabric: 'Satin cotton, king size',
      price: '₹ 3,600',
      image: DUMMY_IMAGE,
      category: 'Home & Bedding',
      technique: 'floral-wreath',
      craft: 'Appliqué wreath, 2 pillow covers',
      washCare: 'Gentle machine wash',
      badge: 'New',
      description: 'Satin cotton, king size · appliqué wreath, 2 pillow covers.',
    },
    {
      id: 'tan-floral-applique-bedsheet-set',
      name: 'Tan Floral Appliqué Bedsheet Set',
      fabric: 'Satin cotton, king size',
      price: '₹ 3,800',
      image: DUMMY_IMAGE,
      category: 'Home & Bedding',
      technique: 'floral-wreath',
      craft: 'Appliqué wreath, 2 pillow covers',
      washCare: 'Gentle machine wash',
      badge: 'New',
      description: 'Satin cotton, king size · appliqué wreath, 2 pillow covers.',
    },
  ],
  occasions: [],
  categories: [],
  customerStories: [
    {
      id: 's1',
      name: 'Ritu Nair',
      location: 'Kochi',
      quote: 'I felt the raised edge of the peacock motif before I even looked down — that\u2019s when I knew it wasn\u2019t printed.',
      image: DUMMY_IMAGE,
      occasion: 'Style note',
    },
    {
      id: 's2',
      name: 'Ananya Bhatt',
      location: 'Bengaluru',
      quote: 'Wear the co-ord set to work with sneakers, then swap the flats for heels for dinner. Genuinely one outfit, two lives.',
      image: DUMMY_IMAGE,
      occasion: 'Style note',
    },
    {
      id: 's3',
      name: 'Farah Sheikh',
      location: 'Hyderabad',
      quote: 'Bought the dupatta for a wedding. Every sun motif sits slightly differently — you can tell it was cut by hand.',
      image: DUMMY_IMAGE,
      occasion: 'Style note',
    },
  ],
  contactInfo: {
    storeName: 'Gaurangi',
    tagline: 'Contemporary womenswear built on hand-cut Pipili appliqué. Nothing printed, nothing laser-cut.',
    address: 'Bhubaneswar · Delhi',
    phone: '+91 98765 43210',
    email: 'hello@gaurangi.in',
    instagram: '@gaurangi',
  },
};
