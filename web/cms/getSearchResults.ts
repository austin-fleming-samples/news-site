import { Nullable } from '@typings/helpers';
import { blockContentFragment } from './queryFragments';
import type { Quickquotes, Quickreads, Videoposts } from './types/sanityTypes';
import { getClient } from './utils/getClient';

/*
FRAGMENTS
*/
const fullProjection = `{
  ...,
  series->,
  author->,
  'isBreaking': isBreaking == true,
  'isFeatured': isFeatured == true,
  'body': body[] ${blockContentFragment}
}`;

type ResultProps = Videoposts | Quickquotes | Quickreads;

/*
QUERIES
*/
const searchBlock = `[title, tags[].value, summary, productSeries, featured_quote.quote, featured_quote.quote, featured_quote.summary, featured_quote.citation, pt::text(body)] match [$searchTerm]`;

export const searchQuery = `*[_type in ["videoposts", "quickreads", "quickquotes"] && defined(slug) && ${searchBlock}][0..$maxResults]${fullProjection}`;

/*
FETCHERS
*/
export const getSearchResults = async (searchTerm: string, maxResults: number, preview = false) =>
  getClient(preview).fetch<Nullable<ResultProps[]>>(searchQuery, { maxResults, searchTerm });
