import { getImage, getDimensionsFromSanityImage } from '@cms/images';
import { getClient } from '@cms/utils/getClient';
import {
  SEO_DEFAULT_IMAGE_WIDTH,
  SEO_DEFAULT_IMAGE_HEIGHT,
  SEO_DEFAULT_IMAGE_FORMAT,
  AMP_PUBLISHER_LOGO_HEIGHT,
  AMP_PUBLISHER_LOGO_FORMAT,
  AMP_PUBLISHER_LOGO_PADDING,
  AMP_PUBLISHER_LOGO_BACKGROUND,
  AMP_SQUARE_PUBLISHER_LOGO_SIZE,
  AMP_SQUARE_PUBLISHER_LOGO_FORMAT,
  AMP_SQUARE_PUBLISHER_LOGO_BACKGROUND,
} from '@config/constants';
import { parseError } from '@lib/errors';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Nullable } from '@typings/helpers';
import type { NormalizedImage } from '@typings/images';
import type { GeneralSettingsSingleton, DefaultSeoSingleton } from './types/codegen';
import { Author } from './types/sanityTypes';

/* type DefaultSettings = {
  seo: ExpandedDefaultSeoSingleton;
  settings: GeneralSettingsSingleton;
}; */

/* 
################### 
CONSTANTS
###################
*/
/* 
################### 
TYPES
###################
*/

/* type DefaultAuthor = {
  image: NormalizedImage;
  name: string;
  primarySite: string;
}; */

type ExpandedDefaultSeoSingleton = DefaultSeoSingleton & {
  fallbackAuthor: Author;
};

/* 
################### 
NORMALIZERS
###################
*/
const normalizeSeoImage = (imageAsset: SanityImageSource, alt: string): NormalizedImage => {
  if (!alt) throw new Error('Failed in "normalizeSeoImage". No alt description provided.');

  /* TODO: [SEO] may need quality option depending on size once tested.
     https://www.sanity.io/docs/image-url#qualityvalue */
  const src = getImage(imageAsset)
    .width(SEO_DEFAULT_IMAGE_WIDTH)
    .height(SEO_DEFAULT_IMAGE_HEIGHT)
    .format(SEO_DEFAULT_IMAGE_FORMAT)
    .url();

  if (!src) throw new Error('Failed in "normalizeSeoImage". Failed to fetch image src.');

  return {
    alt,
    format: SEO_DEFAULT_IMAGE_FORMAT,
    height: SEO_DEFAULT_IMAGE_HEIGHT,
    src,
    width: SEO_DEFAULT_IMAGE_WIDTH,
  };
};

const normalizePublisherLogo = (imageAsset: SanityImageSource): NormalizedImage => {
  const { aspectRatio } = getDimensionsFromSanityImage(imageAsset);

  const imageWidth = aspectRatio * AMP_PUBLISHER_LOGO_HEIGHT;

  const src = getImage(imageAsset)
    .height(AMP_PUBLISHER_LOGO_HEIGHT)
    .width(imageWidth)
    .format(AMP_PUBLISHER_LOGO_FORMAT)
    .bg(AMP_PUBLISHER_LOGO_BACKGROUND)
    .pad(AMP_PUBLISHER_LOGO_PADDING)
    .url();

  if (!src) throw new Error('Failed in "normalizePublisherLogo". Failed to fetch image src.');

  return {
    alt: 'publisher logo',
    format: AMP_PUBLISHER_LOGO_FORMAT,
    height: AMP_PUBLISHER_LOGO_HEIGHT,
    src,
    width: imageWidth,
  };
};

const normalizeSquarePublisherLogo = (imageAsset: SanityImageSource): NormalizedImage => {
  const src = getImage(imageAsset)
    .height(AMP_SQUARE_PUBLISHER_LOGO_SIZE)
    .width(AMP_SQUARE_PUBLISHER_LOGO_SIZE)
    .fit('clip')
    .format(AMP_SQUARE_PUBLISHER_LOGO_FORMAT)
    .bg(AMP_SQUARE_PUBLISHER_LOGO_BACKGROUND)
    .url();

  if (!src) throw new Error('Failed in "normalizeSquarePublisherLogo". Failed to fetch image src.');

  return {
    alt: 'square publisher logo',
    format: AMP_SQUARE_PUBLISHER_LOGO_FORMAT,
    height: AMP_SQUARE_PUBLISHER_LOGO_SIZE,
    src,
    width: AMP_SQUARE_PUBLISHER_LOGO_SIZE,
  };
};

const normalizeDefaultAuthor = (author: Author) => {
  const { mainimage, title, primarySite, twitterHandle } = author;

  if (!(mainimage?.asset || mainimage?.alt))
    throw new Error(
      'Failed in "normalizeDefaultAuthor". Author is either missing "mainimage" or "mainimage.alt".',
    );

  if (!title) throw new Error('Failed in "normalizeDefaultAuthor". Author is missing "title".');

  if (!primarySite)
    throw new Error('Failed in "normalizeDefaultAuthor". Author is missing "primarySite".');

  const image = normalizeSeoImage(mainimage.asset, mainimage.alt);

  return {
    image,
    name: title,
    primarySite,
    ...(twitterHandle && { twitterHandle }),
  };
};

/* 
################### 
QUERIES
###################
*/

const defaultSeoQuery = `*[_type == "defaultSeoSingleton"][0]{
    ...,
    fallbackAuthor ->
}`;

const generalSettingsQuery = `*[_type == "generalSettingsSingleton"][0]`;

const fetchDefaultSeo = async (preview: boolean) =>
  getClient(preview).fetch<Nullable<ExpandedDefaultSeoSingleton>>(defaultSeoQuery);

const fetchGeneralSettings = async (preview: boolean) =>
  getClient(preview).fetch<Nullable<GeneralSettingsSingleton>>(generalSettingsQuery);

/* 
################### 
MAIN
###################
*/

/* NOTE: if something goes wrong here, the build should crash to avoid SEO damage. */
export const getDefaultSettings = async (preview = false) => {
  try {
    const defaultSeoFetch = fetchDefaultSeo(preview);
    const generalSettingsFetch = fetchGeneralSettings(preview);

    const [defaultSeo, generalSettings] = [await defaultSeoFetch, await generalSettingsFetch];

    if (!defaultSeo) throw new Error('Failed to fetch data at "fetchDefaultSettings"');

    if (!generalSettings) throw new Error('Failed to fetch data at "fetchGeneralSettings"');

    const normalizedDefaultImage = normalizeSeoImage(
      defaultSeo.defaultImage,
      defaultSeo.defaultImage.alt,
    );

    const normalizedPublisherLogo = normalizePublisherLogo(defaultSeo.publisherLogo);

    const normalizedSquarePublisherLogo = normalizeSquarePublisherLogo(
      defaultSeo.squarePublisherLogo,
    );

    const normalizedDefaultAuthor = normalizeDefaultAuthor(defaultSeo.fallbackAuthor);

    return {
      generalSettings,
      seo: {
        ...defaultSeo,
        defaultImage: normalizedDefaultImage,
        fallbackAuthor: normalizedDefaultAuthor,
        publisherLogo: normalizedPublisherLogo,
        squarePublisherLogo: normalizedSquarePublisherLogo,
      },
    };
  } catch (error) {
    throw new Error(
      `Failed to get default settings at "getDefaultSettings". Caught error: ${parseError(error)}`,
    );
  }
};
