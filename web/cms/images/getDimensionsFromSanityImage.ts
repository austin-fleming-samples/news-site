import { getIdFromSanityImage } from '@cms/images';
import { stringToInteger } from '@lib/strings';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const getDimensionsFromSanityImage = (imageAsset: SanityImageSource) => {
  const imageId = getIdFromSanityImage(imageAsset);

  const fragments = imageId.split('-');
  const dimFragment = fragments[2];
  const [width, height] = dimFragment.split('x').map((dim) => stringToInteger(dim));

  const aspectRatio = width / height;

  return {
    aspectRatio,
    height,
    width,
  };
};
