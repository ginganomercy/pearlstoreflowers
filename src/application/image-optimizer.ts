import {
  IMAGE_TARGET_WIDTH_PX,
  IMAGE_TARGET_QUALITY_PERCENT,
} from '../domain/constants';

/**
 * Transforms external Unsplash image URLs into lightweight, bandwidth-efficient WebP images.
 * Reduces byte payload by up to ~65% compared to standard high-resolution JPEG.
 */
export function optimizeImageUrl(
  rawUrl: string,
  targetWidth: number = IMAGE_TARGET_WIDTH_PX,
  quality: number = IMAGE_TARGET_QUALITY_PERCENT
): string {
  if (!rawUrl) {
    return '';
  }

  // Handle Unsplash CDN URL parameters
  if (rawUrl.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(rawUrl);
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fit', 'crop');
      urlObj.searchParams.set('w', String(targetWidth));
      urlObj.searchParams.set('q', String(quality));
      urlObj.searchParams.set('fm', 'webp');
      return urlObj.toString();
    } catch {
      return rawUrl;
    }
  }

  return rawUrl;
}

