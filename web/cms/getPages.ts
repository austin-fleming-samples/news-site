import { Nullable } from '@typings/helpers';
import { blockContentFragment } from './queryFragments';
import type { Page } from './types/sanityTypes';
import { getClient } from './utils/getClient';

/* FRAGMENTS */
const fullProjection = `{
  ...,
  'sections': sections[]{
      ...,
      _type == "articleText" => {
          ...,
          'body': body[] ${blockContentFragment}
      }
  }
}`;

/* QUERIES */
export const singlePageQuery = `*[_type == "page" && slug.current == $slug] [0] ${fullProjection}`;

/* FETCHERS */
export const getSinglePage = async (slug: string, preview = false) =>
  getClient(preview).fetch<Nullable<Page>>(singlePageQuery, { slug });
