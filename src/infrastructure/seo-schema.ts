import type { FlowerProduct, StudioInfo } from '../domain/types';

/**
 * Generates Schema.org JSON-LD structured data for Google & Social Crawlers.
 * Informs search engines of local florist entity, catalog items, and operating schedule.
 */
export function generateFloristJsonLd(
  studio: StudioInfo,
  products: readonly FlowerProduct[]
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Florist',
        '@id': 'https://shelwacraft.com/#organization',
        name: studio.name,
        description: studio.tagline,
        telephone: studio.whatsappDisplay,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bandung',
          addressRegion: 'Jawa Barat',
          addressCountry: 'ID',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
            opens: '08:00',
            closes: '20:00',
          },
        ],
        priceRange: 'Rp 150.000 - Rp 500.000',
        areaServed: ['Bandung', 'Cimahi', 'Jawa Barat', 'Indonesia'],
      },
      {
        '@type': 'ItemList',
        name: 'Katalog Buket Bunga Shelwa Craft',
        numberOfItems: products.length,
        itemListElement: products.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: item.title,
            sku: item.code,
            description: item.description,
            image: item.imageUrl,
            category: item.categoryLabel,
            offers: {
              '@type': 'Offer',
              price: item.priceNumeric,
              priceCurrency: 'IDR',
              availability: item.isReadyStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/PreOrder',
            },
          },
        })),
      },
    ],
  };

  return JSON.stringify(schema);
}

/**
 * Injects or updates JSON-LD script tag in the document head.
 */
export function injectSeoSchema(
  studio: StudioInfo,
  products: readonly FlowerProduct[]
): void {
  if (typeof document === 'undefined') return;

  const scriptId = 'shelwa-craft-jsonld';
  let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  scriptEl.textContent = generateFloristJsonLd(studio, products);
}
