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
        '@id': 'https://pearlstoreflowers.com/#organization',
        name: studio.name,
        description: studio.tagline,
        telephone: studio.whatsappDisplay,
        url: 'https://pearlstoreflowers.pages.dev',
        sameAs: [
          studio.instagramUrl,
          studio.threadsUrl,
          studio.xUrl,
        ].filter(Boolean) as string[],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ruko Kirana Lestari Blok D5, Jl. Raya Slawi Jatibarang',
          addressLocality: 'Slawi, Tegal',
          addressRegion: 'Jawa Tengah',
          postalCode: '52411',
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
            opens: '09:00',
            closes: '17:00',
          },
        ],
        priceRange: 'Rp 70.000 - Rp 350.000',
        areaServed: ['Slawi', 'Tegal', 'Brebes', 'Jawa Tengah', 'Indonesia'],
      },
      {
        '@type': 'ItemList',
        name: `Katalog Buket Bunga ${studio.name}`,
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
            url: `https://shelwa-craft.pages.dev/koleksi/${item.slug}`,
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
 * Generates specific Schema.org JSON-LD structured data for an individual product landing page.
 */
export function generateSingleProductJsonLd(
  studio: StudioInfo,
  product: FlowerProduct
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    sku: product.code,
    description: product.description,
    image: product.imageUrl,
    category: product.categoryLabel,
    brand: {
      '@type': 'Brand',
      name: studio.name,
    },
    offers: {
      '@type': 'Offer',
      price: product.priceNumeric,
      priceCurrency: 'IDR',
      priceValidUntil: '2026-12-31',
      availability: product.isReadyStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Florist',
        name: studio.name,
      },
    },
  };

  return JSON.stringify(schema);
}
