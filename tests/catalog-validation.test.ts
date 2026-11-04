import { describe, it, expect } from 'bun:test';
import rawCatalog from '../src/data/catalog.json';
import { validateCatalog } from '../src/domain/catalog.schema';
import {
  TOTAL_CATALOG_PRODUCTS_COUNT,
  STUDIO_BRAND_NAME,
  STUDIO_HANDLE,
  STUDIO_INSTAGRAM_URL,
  STUDIO_WHATSAPP_NUMBER,
  STUDIO_X_HANDLE,
  STUDIO_X_URL,
  STUDIO_THREADS_HANDLE,
  STUDIO_THREADS_URL,
} from '../src/domain/constants';

describe('Catalog Data Guard (Zod Validation)', () => {
  it('should validate complete catalog and verify exactly 21 authentic products', () => {
    const validated = validateCatalog(rawCatalog);
    expect(validated.products.length).toBe(TOTAL_CATALOG_PRODUCTS_COUNT);
  });

  it('should verify studio branding corresponds to Pearl Store Flowers', () => {
    const validated = validateCatalog(rawCatalog);
    expect(validated.studio.name).toBe(STUDIO_BRAND_NAME);
    expect(validated.studio.handle).toBe(STUDIO_HANDLE);
    expect(validated.studio.instagramUrl).toBe(STUDIO_INSTAGRAM_URL);
    expect(validated.studio.whatsappNumber).toBe(STUDIO_WHATSAPP_NUMBER);
    expect(validated.studio.xHandle).toBe(STUDIO_X_HANDLE);
    expect(validated.studio.xUrl).toBe(STUDIO_X_URL);
    expect(validated.studio.threadsHandle).toBe(STUDIO_THREADS_HANDLE);
    expect(validated.studio.threadsUrl).toBe(STUDIO_THREADS_URL);
  });

  it('should enforce every product has valid PSF- code and unique slug', () => {
    const validated = validateCatalog(rawCatalog);
    const slugs = new Set<string>();

    for (const product of validated.products) {
      expect(product.code.startsWith('PSF-')).toBe(true);
      expect(product.slug).toMatch(/^[a-z0-9-]+$/);
      expect(slugs.has(product.slug)).toBe(false);
      slugs.add(product.slug);
    }

    expect(slugs.size).toBe(TOTAL_CATALOG_PRODUCTS_COUNT);
  });

  it('should verify all products have non-empty flower compositions', () => {
    const validated = validateCatalog(rawCatalog);
    for (const product of validated.products) {
      expect(product.flowerComposition.length).toBeGreaterThan(0);
      expect(product.priceNumeric).toBeGreaterThan(0);
    }
  });
});

