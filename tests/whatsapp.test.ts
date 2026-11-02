import { describe, it, expect } from 'bun:test';
import {
  sanitizeWhatsAppPhone,
  createWhatsAppOrderLink,
  createWhatsAppConsultLink,
} from '../src/application/whatsapp';
import type { FlowerProduct, StudioInfo } from '../src/domain/types';

describe('WhatsApp Application Service', () => {
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
    flowerComposition: ['Mawar Putih Holland', "Baby's Breath", 'Eucalyptus Cinerea'],
    wrappingMaterial: 'Pita Satin Ivory Double Layer',
    priceDisplay: 'Rp 275.000',
    priceNumeric: 275000,
    leadTime: 'Pre-Order H-3',
    isPopular: true,
    isReadyStock: false,
    description: 'Bunga tangan pengantin premium bernuansa putih bersih klasik.',
    dimension: 'Tinggi ~35cm, Diameter ~28cm',
    colorTheme: 'Ivory White & Sage Green',
  };

  it('should sanitize phone number correctly when leading zero is provided', () => {
    const rawPhone = '0812-3456-7890';
    const sanitized = sanitizeWhatsAppPhone(rawPhone);
    expect(sanitized).toBe('6281234567890');
  });

  it('should preserve international prefix when already starting with country code', () => {
    const rawPhone = '6281234567890';
    const sanitized = sanitizeWhatsAppPhone(rawPhone);
    expect(sanitized).toBe('6281234567890');
  });

  it('should generate properly formatted order link referencing Pearl Store Flowers', () => {
    const link = createWhatsAppOrderLink(mockProduct, mockStudio.whatsappNumber, mockStudio.name);

    expect(link).toContain('https://wa.me/6281234567890?text=');
    const decodedUrl = decodeURIComponent(link);
    expect(decodedUrl).toContain('Halo Pearl Store Flowers');
    expect(decodedUrl).toContain('Kode: PSF-WED-01');
    expect(decodedUrl).toContain('Elegance White Rose Bridal Bouquet');
    expect(decodedUrl).toContain('Rp 275.000');
    expect(decodedUrl).toContain('koleksi/psf-wed-01-elegance-white-rose');
  });

  it('should generate valid consultation link for Pearl Store Flowers', () => {
    const link = createWhatsAppConsultLink(mockStudio, 'Pernikahan Adat');

    expect(link).toContain('https://wa.me/6281234567890?text=');
    const decodedUrl = decodeURIComponent(link);
    expect(decodedUrl).toContain('Pearl Store Flowers');
    expect(decodedUrl).toContain('Pernikahan Adat');
  });
});
