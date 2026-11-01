import type { FlowerProduct, ProductCategory } from '../domain/types';

export interface CategoryCount {
  readonly category: ProductCategory;
  readonly label: string;
  readonly count: number;
}

/**
 * Filters products based on selected category and search keyword.
 * Search is multi-field and case-insensitive across:
 * - Product Title
 * - Product Code (e.g. SC-WED-01)
 * - Flower composition elements (e.g. "Mawar", "Hydrangea", "Baby's Breath")
 * - Color theme
 */
export function filterProducts(
  products: readonly FlowerProduct[],
  category: ProductCategory,
  searchQuery: string
): FlowerProduct[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    // 1. Category Filter
    if (category !== 'Semua' && product.category !== category) {
      return false;
    }

    // 2. Search Query Filter
    if (!normalizedQuery) {
      return true;
    }

    const titleMatch = product.title.toLowerCase().includes(normalizedQuery);
    const codeMatch = product.code.toLowerCase().includes(normalizedQuery);
    const colorMatch = product.colorTheme.toLowerCase().includes(normalizedQuery);
    const categoryMatch = product.categoryLabel.toLowerCase().includes(normalizedQuery);
    const compositionMatch = product.flowerComposition.some((flower) =>
      flower.toLowerCase().includes(normalizedQuery)
    );
    const descriptionMatch = product.description.toLowerCase().includes(normalizedQuery);

    return (
      titleMatch ||
      codeMatch ||
      colorMatch ||
      categoryMatch ||
      compositionMatch ||
      descriptionMatch
    );
  });
}

/**
 * Computes product counts per category for UI filter tabs.
 */
export function getCategoryCounts(products: readonly FlowerProduct[]): CategoryCount[] {
  const counts: Record<ProductCategory, number> = {
    Semua: products.length,
    Wedding: 0,
    Engagement: 0,
    Graduation: 0,
    Custom: 0,
  };

  for (const product of products) {
    counts[product.category] = (counts[product.category] || 0) + 1;
  }

  return [
    { category: 'Semua', label: 'Semua Koleksi', count: counts.Semua },
    { category: 'Wedding', label: 'Pernikahan (Bridal)', count: counts.Wedding },
    { category: 'Engagement', label: 'Lamaran & Tunangan', count: counts.Engagement },
    { category: 'Graduation', label: 'Wisuda & Kelulusan', count: counts.Graduation },
    { category: 'Custom', label: 'Kustom & Bunga Abadi', count: counts.Custom },
  ];
}

