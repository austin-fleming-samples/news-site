import { getImage, getDimensionsFromSanityImage, getImageTypeFromSanityImage } from '@cms/images';
import { normalizeLink } from '@cms/normalizers';
import type { HeaderSingleton } from '@cms/types/codegen';
import { getClient } from '@cms/utils/getClient';
import { SITE_LOGO_IMAGE_HEIGHT } from '@config/constants';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Nullable } from '@typings/helpers';
import { NormalizedImage } from '@typings/images';

const query = `*[_type == "headerSingleton"][0]{
  ...,
  headerNavigation[]{
    ...,
    destination {
      ...,
      internalPageReference->{
        _type,
        'slug': slug.current
      }
    }
  }
}`;

const normalizeLogoImage = (imageAsset: SanityImageSource, alt: string): NormalizedImage => {
  if (!alt) throw new Error('Failed in "normalizeLogoImage". No alt description provided.');

  const { aspectRatio } = getDimensionsFromSanityImage(imageAsset);
  const imageType = getImageTypeFromSanityImage(imageAsset);

  const imageWidth = Math.ceil(aspectRatio * SITE_LOGO_IMAGE_HEIGHT);

  const src = getImage(imageAsset).height(SITE_LOGO_IMAGE_HEIGHT).width(imageWidth).url();

  if (!src) throw new Error('Failed in "normalizeLogoImage". Failed to fetch image src.');

  return {
    alt,
    format: imageType,
    height: SITE_LOGO_IMAGE_HEIGHT,
    src,
    width: imageWidth,
  };
};

export const getHeaderSettings = async (preview = false) => {
  const data = await getClient(preview).fetch<Nullable<HeaderSingleton>>(query);

  if (!data) throw new Error('Failed to fetch data at "getHeaderSettings"');

  const { headerLogo, headerNavigation } = data;

  /* eslint-disable-next-line unicorn/no-array-callback-reference */
  const normalizedLinks = headerNavigation.map(normalizeLink);

  if (!normalizedLinks) throw new Error('Failed to normalize links at "getHeaderSettings"');

  const normalizedLogoImage = normalizeLogoImage(headerLogo, headerLogo.alt);

  return {
    headerLogo: normalizedLogoImage,
    headerNavigation: normalizedLinks,
  };
};
