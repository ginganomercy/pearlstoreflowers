/**
 * Domain types for Shelwa Craft Storefront & Flower Catalog.
 */

export type ProductCategory =
  | 'Semua'
  | 'Wedding'
  | 'Engagement'
  | 'Graduation'
  | 'Custom';

export interface FlowerProduct {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly category: 'Wedding' | 'Engagement' | 'Graduation' | 'Custom';
  readonly categoryLabel: string;
  readonly flowerComposition: readonly string[];
  readonly wrappingMaterial: string;
  readonly priceDisplay: string;
  readonly priceNumeric: number;
  readonly leadTime: string;
  readonly isPopular?: boolean;
  readonly isReadyStock?: boolean;
  readonly description: string;
  readonly dimension: string;
  readonly colorTheme: string;
  readonly imageUrl?: string;
}

export interface StudioInfo {
  readonly name: string;
  readonly handle: string;
  readonly tagline: string;
  readonly location: string;
  readonly operatingHours: string;
  readonly whatsappNumber: string;
  readonly whatsappDisplay: string;
  readonly instagramUrl: string;
  readonly services: readonly string[];
}
