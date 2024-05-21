import type { Link } from '@cms/types/codegen';

export const POST_TYPES = ['quickquotes', 'quickreads', 'videoposts'];

export const PAGE_REFERENCE_MAP = {
  author: '/author',
  cardseries: '/series/quickreads',
  page: '/info',
  quickquotes: '/quickquotes',
  quickreads: '/quickreads',
  videoposts: '/videoposts',
  videoseries: '/series/videos',
};

export const POST_TYPE_PAGE_MAP: Record<
  NonNullable<Link['destination']['postTypePage']>,
  string
> = {
  home: '/',
  quickquotes: '/quickquotes/all/1',
  quickreads: '/quickreads/all/1',
  search: '/search',
  'support-us': '/support-us',
  'support-us/partnerships': '/support-us/partnerships',
  videoposts: '/videoposts/all/1',
};

export const FALLBACK_PRERENDERED_POSTS = 10;

export const SEO_DEFAULT_IMAGE_WIDTH = 1200;
export const SEO_DEFAULT_IMAGE_HEIGHT = 1200;
export const SEO_DEFAULT_IMAGE_FORMAT = 'jpg';

/* NOTE: only height specified. Logo must fit in a 60x600 box 
https://developers.google.com/search/docs/advanced/structured-data/article#logo-guidelines */
export const AMP_PUBLISHER_LOGO_HEIGHT = 60;
export const AMP_PUBLISHER_LOGO_FORMAT = 'png';
export const AMP_PUBLISHER_LOGO_PADDING = 6;
export const AMP_PUBLISHER_LOGO_BACKGROUND = '#FFFFFF';

/* NOTE: must be square. Must not be transparent.
https://amp.dev/documentation/components/amp-story/?referrer=ampproject.org#publisher-logo-src-guidelines */
export const AMP_SQUARE_PUBLISHER_LOGO_SIZE = 96;
export const AMP_SQUARE_PUBLISHER_LOGO_FORMAT = 'png';
export const AMP_SQUARE_PUBLISHER_LOGO_BACKGROUND = '#FFFFFF';

export const SITE_LOGO_IMAGE_HEIGHT = 80;

/* TODO: implement color scheme in css and have it toggle this. */
type PreferredColorScheme = 'light' | 'dark' | 'light dark' | 'normal' | 'light only' | 'dark only';
export const DEFAULT_COLOR_SCHEME: PreferredColorScheme = 'light only';

export const FALLBACK_IMAGE_WIDTH = 4000;
export const FALLBACK_IMAGE_FORMAT = 'jpg';
