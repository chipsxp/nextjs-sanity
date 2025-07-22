/**
 * Validates if an image object has a valid asset reference
 * This prevents errors when images are still uploading or have invalid references
 */

import { SanityImageSource } from "@sanity/image-url/lib/types/types";

/**
 * Validates if an image object has a valid asset reference
 * This prevents errors when images are still uploading or have invalid references
 */
export function hasValidImageAsset(image: unknown): image is SanityImageSource {
  return Boolean(
    image && 
    typeof image === 'object' && 
    'asset' in image && 
    image.asset && 
    typeof image.asset === 'object' && 
    '_ref' in image.asset && 
    (image.asset as { _ref?: string })._ref
  );
}

/**
 * Validates if an image object is ready for URL generation
 * This checks for both valid asset reference and excludes upload state
 */
export function isImageReady(image: unknown): image is SanityImageSource {
  // Check if it's a valid image asset
  if (!hasValidImageAsset(image)) {
    return false;
  }
  
  // Check if it's in upload state (has _upload property)
  if (image && typeof image === 'object' && '_upload' in image) {
    return false;
  }
  
  return true;
}
