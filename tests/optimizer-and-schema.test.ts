import { describe, it, expect } from 'bun:test';
import { optimizeImageUrl } from '../src/application/image-optimizer';
import { generateFloristJsonLd } from '../src/infrastructure/seo-schema';
import {
  TOTAL_CATALOG_PRODUCTS_COUNT,
  IMAGE_TARGET_WIDTH_PX,
  SEARCH_DEBOUNCE_DELAY_MS,
} from '../src/domain/constants';
import type { StudioInfo, FlowerProduct } from '../src/domain/types';

describe('Performance Optimizer & SEO Infrastructure', () => {
  it('should optimize Unsplash image URL with WebP format and width constraints', () => {
    const rawUrl = 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80';
    const optimized = optimizeImageUrl(rawUrl, 600, 75);

    expect(optimized).toContain('w=600');
    expect(optimized).toContain('q=75');
    expect(optimized).toContain('fm=webp');
  });

  it('should return untouched URL for non-Unsplash images', () => {
    const localUrl = '/photos/local-flower.jpg';
    expect(optimizeImageUrl(localUrl)).toBe(localUrl);
  });

  it('should return empty string safely when URL is undefined or empty', () => {
    expect(optimizeImageUrl('')).toBe('');
  });

  it('should verify domain constants conform to expected thresholds', () => {
    expect(TOTAL_CATALOG_PRODUCTS_COUNT).toBe(38);
    expect(IMAGE_TARGET_WIDTH_PX).toBe(600);
    expect(SEARCH_DEBOUNCE_DELAY_MS).toBe(150);
  });

  it('should generate valid JSON-LD schema with Florist and ItemList nodes', () => {
    const mockStudio: StudioInfo = {
      name: 'Shelwa Craft',
      handle: '@shelwa_craft',
      tagline: 'Custom Floral & Hand Bouquet Studio',
      location: 'Bandung & Sekitarnya',
      operatingHours: '08.00 - 20.00 WIB',
      whatsappNumber: '0812-3456-7890',
      whatsappDisplay: '+62 812-3456-7890',
      instagramUrl: 'https://www.instagram.com/shelwa_craft/',
      services: ['Wedding', 'Engagement', 'Graduation', 'Custom'],
    };

    const mockProduct: FlowerProduct = {
      id: 'prod-01',
      code: 'SC-WED-01',
      title: 'Elegance White Rose Bridal Bouquet',
      category: 'Wedding',
      categoryLabel: 'Pernikahan / Bridal',
      flowerComposition: ['Mawar Putih Holland', "Baby's Breath"],
      wrappingMaterial: 'Pita Satin Ivory',
      priceDisplay: 'Rp 275.000',
      priceNumeric: 275000,
      leadTime: 'Pre-Order H-3',
      description: 'Bunga tangan pengantin premium.',
      dimension: 'Tinggi ~35cm',
      colorTheme: 'Ivory White',
    };

    const jsonLdString = generateFloristJsonLd(mockStudio, [mockProduct]);
    const parsed = JSON.parse(jsonLdString);

    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@graph'].length).toBe(2);

    const floristNode = parsed['@graph'].find((n: { '@type': string }) => n['@type'] === 'Florist');
    expect(floristNode.name).toBe('Shelwa Craft');

    const itemListNode = parsed['@graph'].find((n: { '@type': string }) => n['@type'] === 'ItemList');
    expect(itemListNode.numberOfItems).toBe(1);
    expect(itemListNode.itemListElement[0].item.sku).toBe('SC-WED-01');
    expect(itemListNode.itemListElement[0].item.offers.price).toBe(275000);
  });
});

