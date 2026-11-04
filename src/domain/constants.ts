/**
 * Domain constants and configuration thresholds for Pearl Store Flowers Storefront.
 * Strictly complies with zero-magic-number policy.
 */

/** Official Studio Brand Constants */
export const STUDIO_BRAND_NAME = 'Pearl Store Flowers';
export const STUDIO_HANDLE = '@pearl.storeflowers';
export const STUDIO_INSTAGRAM_URL = 'https://www.instagram.com/pearl.storeflowers';
export const STUDIO_WHATSAPP_NUMBER = '6285198256961';
export const STUDIO_WHATSAPP_DISPLAY = '+62 851-9825-6961';
export const STUDIO_X_HANDLE = '@pearlflower64';
export const STUDIO_X_URL = 'https://x.com/pearlflower64';
export const STUDIO_THREADS_HANDLE = '@pearl.storeflowers';
export const STUDIO_THREADS_URL = 'https://www.threads.net/@pearl.storeflowers';
export const STUDIO_TAGLINE = 'Luxury Floral & Hand Bouquet Atelier';
export const STUDIO_DEFAULT_CITY = 'Slawi, Tegal';
export const STUDIO_WORKSHOP_ADDRESS = 'Ruko Kirana Lestari Blok D5, Jl. Raya Slawi Jatibarang, Tegal/Slawi';

/** Product SKU Prefix */
export const SKU_PREFIX = 'PSF';

/** Delay in milliseconds before triggering catalog search filter */
export const SEARCH_DEBOUNCE_DELAY_MS = 150;

/** Total verified product count in catalog (37 Real Authentic Atelier Bouquets) */
export const TOTAL_CATALOG_PRODUCTS_COUNT = 37;

/** Default image compression width for mobile webview */
export const IMAGE_TARGET_WIDTH_PX = 600;

/** Default image compression quality percentage */
export const IMAGE_TARGET_QUALITY_PERCENT = 75;

/** Modal high-resolution image target width */
export const MODAL_IMAGE_TARGET_WIDTH_PX = 800;

/** Number of product cards rendered above-the-fold with priority loading */
export const ABOVE_THE_FOLD_PRIORITY_COUNT = 3;

/** Standard pre-order notice days for bridal and engagement bouquets */
export const STANDARD_LEAD_TIME_DAYS = 3;

/** Default WhatsApp consultation message character limit check */
export const WHATSAPP_PHONE_MIN_DIGITS = 10;
export const WHATSAPP_PHONE_MAX_DIGITS = 15;

/** Fuzzy search configuration thresholds */
export const FUZZY_SEARCH_TOLERANCE = 0.3;
export const MIN_SEARCH_QUERY_LENGTH = 1;

/**
 * 100% Solid Soft Pastel Design Tokens (Zero Gradient Policy).
 * All text colors verified for WCAG AA / AAA contrast ratios against pastel backgrounds.
 */
export const SOLID_SOFT_PALETTE = {
  softPink: {
    name: 'Soft Pink (Rose Blush)',
    bg: '#FDF2F8',
    surface: '#FCE7F3',
    border: '#FBCFE8',
    text: '#9D174D',
    accent: '#BE185D',
    category: 'Wedding',
  },
  softBlue: {
    name: 'Soft Blue (Serenity Sky)',
    bg: '#F0F9FF',
    surface: '#E0F2FE',
    border: '#BAE6FD',
    text: '#075985',
    accent: '#0369A1',
    category: 'Graduation',
  },
  softYellow: {
    name: 'Soft Kuning (Pastel Buttercup)',
    bg: '#FEFCE8',
    surface: '#FEF9C3',
    border: '#FEF08A',
    text: '#854D0E',
    accent: '#A16207',
    category: 'Custom',
  },
  softGreen: {
    name: 'Soft Green (Sage Mint)',
    bg: '#F0FDF4',
    surface: '#DCFCE7',
    border: '#BBF7D0',
    text: '#14532D',
    accent: '#15803D',
    category: 'Engagement',
  },
} as const;

/** Mapping of product categories to solid soft color tokens */
export const CATEGORY_SOFT_COLOR_MAP = {
  Wedding: 'softPink',
  Graduation: 'softBlue',
  Custom: 'softYellow',
  Engagement: 'softGreen',
} as const;

/** Curated quick-search suggestion chips with zero-gradient solid soft themes & bold vector icons */
export const QUICK_SEARCH_SUGGESTIONS = [
  {
    id: 'chip-rose-red',
    label: 'Mawar Merah',
    query: 'Mawar',
    colorTheme: 'softPink' as const,
    iconType: 'flower' as const,
    description: 'Koleksi buket mawar merah klasik & beludru romantis',
  },
  {
    id: 'chip-sunflower-yellow',
    label: 'Sunflower',
    query: 'Sunflower',
    colorTheme: 'softYellow' as const,
    iconType: 'sun' as const,
    description: 'Bunga matahari cerah untuk wisuda & perayaan',
  },
  {
    id: 'chip-casablanka-lily',
    label: 'Lily Casablanca',
    query: 'Lily',
    colorTheme: 'softPink' as const,
    iconType: 'gem' as const,
    description: 'Bunga oriental lily Casablanca & Stargazer mekar semerbak',
  },
  {
    id: 'chip-krisan-pastel',
    label: 'Bunga Krisan',
    query: 'Krisan',
    colorTheme: 'softBlue' as const,
    iconType: 'graduation' as const,
    description: 'Bunga krisan kuning, ungu mauve, dan pink pastel',
  },
  {
    id: 'chip-carnation-anyelir',
    label: 'Anyelir Pastel',
    query: 'Anyelir',
    colorTheme: 'softPink' as const,
    iconType: 'flower' as const,
    description: 'Rangkaian bunga anyelir mini & spray carnation manis',
  },
  {
    id: 'chip-rustic-goni',
    label: 'Rustic Goni',
    query: 'Goni',
    colorTheme: 'softGreen' as const,
    iconType: 'leaf' as const,
    description: 'Buket bergaya vintage dengan kain karung goni & tali rami',
  },
] as const;
