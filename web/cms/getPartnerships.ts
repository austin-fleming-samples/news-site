import { FALLBACK_IMAGE_FORMAT, FALLBACK_IMAGE_WIDTH } from '@config/constants';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Nullable } from '@typings/helpers';
import type { NormalizedImage } from '@typings/images';
import { getDimensionsFromSanityImage, getImage } from './images';
import type { PartnershipsSingleton } from './types/codegen';
import { getClient } from './utils/getClient';

const query = `*[_type == "partnershipsSingleton"][0]`;

const normalizeImage = (
  imageAsset: SanityImageSource,
  alt: string,
  targetWidth?: number,
  targetHeight?: number,
  format?: 'jpg' | 'png' | 'webp',
): NormalizedImage => {
  if (!alt) throw new Error('Failed in "normalizeImage". No alt description provided.');

  const imageFormat = format || FALLBACK_IMAGE_FORMAT;

  const { aspectRatio } = getDimensionsFromSanityImage(imageAsset);
  /* const imageType = getImageTypeFromSanityImage(imageAsset); */

  let width: number;
  let height: number;

  if (targetWidth && targetHeight) {
    width = targetWidth;
    height = targetHeight;
  } else if (targetWidth) {
    width = targetWidth;
    height = Math.ceil(targetWidth / aspectRatio);
  } else if (targetHeight) {
    width = Math.ceil(targetHeight * aspectRatio);
    height = targetHeight;
  } else {
    width = FALLBACK_IMAGE_WIDTH;
    height = Math.ceil(FALLBACK_IMAGE_WIDTH / aspectRatio);
  }

  const src = getImage(imageAsset).width(width).height(height).format(imageFormat).url();

  if (!src) throw new Error('Failed in "normalizeImage". Failed to fetch image src.');

  return {
    alt,
    format: imageFormat,
    height,
    src,
    width,
  };
};

export const getPartnershipsPage = async (preview = false) => {
  const data = await getClient(preview).fetch<Nullable<PartnershipsSingleton>>(query);

  if (!data) throw new Error('Failed in "getPartnershipsPage". Failed to fetch data.');

  const { backgroundImage } = data;

  const normalizedImage = normalizeImage(backgroundImage, backgroundImage.alt);

  return {
    ...data,
    backgroundImage: normalizedImage,
  };
};
