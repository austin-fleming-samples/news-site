import type { Quickquotes, Quickreads, Videoposts } from '@cms/types/sanityTypes';
import { Nullable } from '@typings/helpers';
import { groq } from 'next-sanity';
import { singleQuickquoteQuery } from './getQuickquotes';
import { singleQuickreadQuery } from './getQuickreads';
import { singleVideopostQuery } from './getVideoposts';
import { blockContentFragment } from './queryFragments';
import { getClient } from './utils/getClient';

// TODO: [SEO] likely where editorsBlog needs to go.
// TYPES
export type PostProps = Videoposts | Quickquotes | Quickreads;

/*
FRAGMENTS
*/
const fullProjection = groq`{
  ...,
  series->,
  author->,
  'isBreaking': isBreaking == true,
  'isFeatured': isFeatured == true,
  'body': body[] ${blockContentFragment}
}`;

// QUERIES
export const postsByAuthorRootQuery = groq`*[_type in ['quickreads', 'quickquotes', 'videoposts'] && defined(slug) && author._ref == $authorId]`;

export const getCursoredPostsByAuthorQuery = groq`${postsByAuthorRootQuery} | order(datePublished asc) [$startCursor...$endCursor] ${fullProjection}`;

export const getPostsByAuthorQuantityQuery = groq`count(${postsByAuthorRootQuery})`;

// FETCHERS
// TODO: [SEO] needs stronger typing
export const singlePostQueryReducer = (type: string): Nullable<string> =>
  ({
    quickquotes: singleQuickquoteQuery,
    quickreads: singleQuickreadQuery,
    videoposts: singleVideopostQuery,
  }[`${type}`]);

export const getSinglePost = async (type: string, slug: string, preview = false) => {
  const query = singlePostQueryReducer(type);
  return query ? getClient(preview).fetch<Nullable<PostProps>>(query, { slug }) : undefined;
};

export const getCursoredPostsByAuthor = async (
  authorId: string,
  startCursor: number,
  endCursor: number,
  preview = false,
) => {
  const dataFetch = getClient(preview).fetch<Nullable<PostProps[]>>(getCursoredPostsByAuthorQuery, {
    authorId,
    endCursor,
    startCursor,
  });

  const quantityFetch = getClient(preview).fetch<Nullable<number>>(getPostsByAuthorQuantityQuery, {
    authorId,
  });

  const [data, quantity] = [await dataFetch, await quantityFetch];

  return { data, quantity };
};
