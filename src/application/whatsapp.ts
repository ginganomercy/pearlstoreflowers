import type { FlowerProduct, StudioInfo } from '../domain/types';

/**
 * Normalizes phone number into standard international format for WhatsApp URL.
 * Example: '0812-3456-7890' -> '6281234567890'
 */
export function sanitizeWhatsAppPhone(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.startsWith('0')) {
    return `62${digitsOnly.slice(1)}`;
  }
  return digitsOnly;
}

/**
 * Generates an automated, prefilled WhatsApp order link for a specific flower product.
 * Formatted for clear communication between customer and studio admin.
 */
export function createWhatsAppOrderLink(
  product: FlowerProduct,
  studioPhone: string
): string {
  const sanitizedPhone = sanitizeWhatsAppPhone(studioPhone);

  const messageLines = [
    `Halo Shelwa Craft, saya ingin memesan buket bunga dari etalase:`,
    ``,
    `*Detail Produk:*`,
    `• Kode: ${product.code}`,
    `• Nama: ${product.title}`,
    `• Kategori: ${product.categoryLabel}`,
    `• Estimasi Harga: ${product.priceDisplay}`,
    `• Lead Time: ${product.leadTime}`,
    ``,
    `*Rencana Pemesanan:*`,
    `• Tanggal Acara / Dibutuhkan: [Tuliskan Tanggal]`,
    `• Wilayah Pengiriman: [Contoh: Bandung Kota / Cimahi / Luar Kota]`,
    `• Catatan Khusus: [Warna pita / Ucapan kartu jika ada]`,
    ``,
    `Mohon informasi ketersediaan slot dan ongkirnya. Terima kasih!`,
  ];

  const fullText = messageLines.join('\n');
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(fullText)}`;
}

/**
 * Generates a prefilled WhatsApp consultation link for general inquiries or custom bouquets.
 */
export function createWhatsAppConsultLink(
  studio: StudioInfo,
  customTopic?: string
): string {
  const sanitizedPhone = sanitizeWhatsAppPhone(studio.whatsappNumber);

  const greeting = customTopic
    ? `Halo ${studio.name}, saya ingin konsultasi mengenai ${customTopic}. Bisakah saya berdiskusi untuk pilihan buket terbaik?`
    : `Halo ${studio.name}, saya ingin konsultasi mengenai pemesanan buket bunga kustom untuk acara saya.`;

  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(greeting)}`;
}

