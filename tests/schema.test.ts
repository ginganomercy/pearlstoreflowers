import { describe, it, expect } from 'bun:test';
import {
  generateFloristJsonLd,
  generateSingleProductJsonLd,
} from '../src/infrastructure/seo-schema';
import type { FlowerProduct, StudioInfo } from '../src/domain/types';

describe('SEO Schema Infrastructure', () => {
  const mockStudio: StudioInfo = {
    name: 'Pearl Store Flowers',
    handle: '@pearl.storeflowers',
    tagline: 'Luxury Floral & Hand Bouquet Atelier',
    location: 'Bandung & Sekitarnya',
    operatingHours: '08.00 - 20.00 WIB',
    whatsappNumber: '0812-3456-7890',
    whatsappDisplay: '+62 812-3456-7890',
    instagramUrl: 'https://www.instagram.com/pearl.storeflowers',
    services: ['Wedding', 'Engagement', 'Graduation', 'Custom'],
  };

  const mockProduct: FlowerProduct = {
    id: 'prod-01',
    code: 'PSF-WED-01',
    slug: 'psf-wed-01-elegance-white-rose',
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
    imageUrl: 'https://images.unsplash.com/photo-test?auto=format',
  };

  it('should generate valid JSON-LD schema for homepage with Florist and ItemList', () => {
    const jsonStr = generateFloristJsonLd(mockStudio, [mockProduct]);
    const parsed = JSON.parse(jsonStr);

    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@graph'].length).toBe(2);

    const florist = parsed['@graph'].find((n: any) => n['@type'] === 'Florist');
    expect(florist.name).toBe('Pearl Store Flowers');
    expect(florist.telephone).toBe('+62 812-3456-7890');

    const itemList = parsed['@graph'].find((n: any) => n['@type'] === 'ItemList');
    expect(itemList.name).toContain('Pearl Store Flowers');
    expect(itemList.numberOfItems).toBe(1);
    expect(itemList.itemListElement[0].item.sku).toBe('PSF-WED-01');
    expect(itemList.itemListElement[0].item.url).toContain('psf-wed-01-elegance-white-rose');
  });

  it('should generate dedicated single product JSON-LD for rich snippets', () => {
    const jsonStr = generateSingleProductJsonLd(mockStudio, mockProduct);
    const parsed = JSON.parse(jsonStr);

    expect(parsed['@type']).toBe('Product');
    expect(parsed.name).toBe('Elegance White Rose Bridal Bouquet');
    expect(parsed.sku).toBe('PSF-WED-01');
    expect(parsed.brand.name).toBe('Pearl Store Flowers');
    expect(parsed.offers.price).toBe(275000);
    expect(parsed.offers.priceCurrency).toBe('IDR');
  });
});

