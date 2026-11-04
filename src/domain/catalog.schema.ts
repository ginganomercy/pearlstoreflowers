import { z } from 'zod';
import {
  TOTAL_CATALOG_PRODUCTS_COUNT,
  WHATSAPP_PHONE_MIN_DIGITS,
  WHATSAPP_PHONE_MAX_DIGITS,
} from './constants';

export const StudioSchema = z.object({
  name: z.string().min(3),
  handle: z.string().startsWith('@'),
  tagline: z.string().min(5),
  location: z.string().min(5),
  operatingHours: z.string().min(5),
  whatsappNumber: z.string().min(WHATSAPP_PHONE_MIN_DIGITS).max(WHATSAPP_PHONE_MAX_DIGITS),
  whatsappDisplay: z.string().min(5),
  instagramUrl: z.string().url(),
  xHandle: z.string().startsWith('@').optional(),
  xUrl: z.string().url().optional(),
  threadsHandle: z.string().startsWith('@').optional(),
  threadsUrl: z.string().url().optional(),
  services: z.array(z.string()).min(1),
});

export const FlowerProductSchema = z.object({
  id: z.string().min(1),
  code: z.string().regex(/^PSF-[A-Z]{3,4}-\d{2}$/, 'SKU must match format PSF-XXX-00 or PSF-XXXX-00'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  title: z.string().min(3),
  category: z.enum(['Wedding', 'Engagement', 'Graduation', 'Custom']),
  categoryLabel: z.string().min(3),
  flowerComposition: z.array(z.string()).min(1),
  wrappingMaterial: z.string().min(3),
  priceDisplay: z.string().refine((val) => val.includes('Rp '), {
    message: 'priceDisplay must contain "Rp "',
  }),
  priceNumeric: z.number().positive(),
  leadTime: z.string().min(3),
  isPopular: z.boolean().optional(),
  isReadyStock: z.boolean().optional(),
  description: z.string().min(10),
  dimension: z.string().min(5),
  colorTheme: z.string().min(3),
  imageUrl: z.string().url().or(z.string().startsWith('/')).optional(),
});

export const CatalogSchema = z.object({
  studio: StudioSchema,
  products: z
    .array(FlowerProductSchema)
    .length(TOTAL_CATALOG_PRODUCTS_COUNT, `Catalog must contain exactly ${TOTAL_CATALOG_PRODUCTS_COUNT} products`),
});

export type ValidatedCatalog = z.infer<typeof CatalogSchema>;

/**
 * Validates the raw catalog JSON data against the domain schema.
 * Throws a formatted ZodError if any data invariant is violated.
 */
export function validateCatalog(data: unknown): ValidatedCatalog {
  return CatalogSchema.parse(data);
}
