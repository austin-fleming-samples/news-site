import type { FooterSingleton } from '@cms/types/sanityTypes';
import { getClient } from '@cms/utils/getClient';
import type { Nullable } from '@typings/helpers';
import { linkFragment } from './queryFragments/linkFragment';

const query = `*[_type == "footerSingleton"][0]{
  ...,
  footerCta {
    ...,
    ctaLink ${linkFragment}
  },
  footerNavigation[] ${linkFragment},
  policies[] ${linkFragment}
}`;

export const getFooter = async (preview = false) =>
  getClient(preview).fetch<Nullable<FooterSingleton>>(query);
