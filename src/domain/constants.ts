/**
 * Domain constants and configuration thresholds for Pearl Store Flowers Storefront.
 * Strictly complies with zero-magic-number policy.
 */

/** Official Studio Brand Constants */
export const STUDIO_BRAND_NAME = 'Pearl Store Flowers';
export const STUDIO_HANDLE = '@pearl.storeflowers';
export const STUDIO_INSTAGRAM_URL = 'https://www.instagram.com/pearl.storeflowers';
export const STUDIO_TAGLINE = 'Luxury Floral & Hand Bouquet Atelier';
export const STUDIO_DEFAULT_CITY = 'Bandung';

/** Product SKU Prefix */
export const SKU_PREFIX = 'PSF';

/** Delay in milliseconds before triggering catalog search filter */
export const SEARCH_DEBOUNCE_DELAY_MS = 150;

/** Total verified product count in catalog */
export const TOTAL_CATALOG_PRODUCTS_COUNT = 38;

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
