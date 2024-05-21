import { getIdFromSanityImage } from '@cms/images';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const getImageTypeFromSanityImage = (imageAsset: SanityImageSource) => {
  const imageId = getIdFromSanityImage(imageAsset);

  const fragments = imageId.split('-');
  return fragments[3];
};
