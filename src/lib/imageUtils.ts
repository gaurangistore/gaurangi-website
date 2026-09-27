/**
 * Browser-side image helpers.
 *
 * The project has no Firebase Storage bucket (see the note in
 * ContentContext), so uploaded images are stored as base64 data URLs inside
 * Firestore documents. That puts a hard ceiling of ~1 MB per document, so every
 * upload is downscaled and re-encoded before it is written.
 *
 * This module exists so the compress/encode logic is defined once — it was
 * previously duplicated between the admin dashboard and the media library.
 */

const DEFAULT_MAX_DIMENSION = 1400;
const DEFAULT_QUALITY = 0.82;

/** Returns true when the browser can encode WebP via canvas. */
const supportsWebp = (): boolean => {
  if (typeof document === 'undefined') return false;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').startsWith('data:image/webp');
};

export interface CompressOptions {
  /** Longest edge of the output, in pixels. */
  maxDimension?: number;
  /** Encoder quality between 0 and 1. */
  quality?: number;
  /** Preferred output format. Falls back to JPEG when the browser lacks WebP. */
  format?: 'image/webp' | 'image/jpeg';
}

/**
 * Downscales and re-encodes an image data URL. Never rejects — if anything
 * goes wrong the original data URL is returned unchanged so an upload is not
 * lost to a cosmetic failure.
 */
export const compressImage = (
  dataUrl: string,
  { maxDimension = DEFAULT_MAX_DIMENSION, quality = DEFAULT_QUALITY, format }: CompressOptions = {}
): Promise<string> =>
  new Promise((resolve) => {
    // Bail out early for non-images rather than feeding garbage to Image().
    if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image')) {
      resolve(dataUrl);
      return;
    }

    const img = new Image();

    img.onload = () => {
      try {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        // JPEG has no alpha channel; fill white so transparent PNGs do not
        // come out with black backgrounds after encoding.
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const mime = format ?? (supportsWebp() ? 'image/webp' : 'image/jpeg');
        resolve(canvas.toDataURL(mime, quality));
      } catch (err) {
        console.error('Image compression failed:', err);
        resolve(dataUrl);
      }
    };

    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });

/** Reads a File into a base64 data URL. */
export const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.readAsDataURL(file);
  });
