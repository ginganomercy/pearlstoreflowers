/**
 * Domain types for Pearl Store Flowers Storefront & Flower Catalog.
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
  readonly slug: string;
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
  readonly xHandle?: string;
  readonly xUrl?: string;
  readonly threadsHandle?: string;
  readonly threadsUrl?: string;
  readonly avatarUrl?: string;
  readonly services: readonly string[];
}

export interface CategorySummary {
  readonly category: ProductCategory;
  readonly count: number;
  readonly description: string;
}

export type SoftColorTheme = 'softPink' | 'softBlue' | 'softYellow' | 'softGreen';

export type QuickSearchIcon = 'flower' | 'graduation' | 'sun' | 'leaf' | 'gem' | 'gift';

export interface QuickSearchChip {
  readonly id: string;
  readonly label: string;
  readonly query: string;
  readonly colorTheme: SoftColorTheme;
  readonly iconType: QuickSearchIcon;
  readonly description: string;
}

export interface SoftColorClasses {
  readonly bg: string;
  readonly surface: string;
  readonly border: string;
  readonly text: string;
  readonly accent: string;
}
