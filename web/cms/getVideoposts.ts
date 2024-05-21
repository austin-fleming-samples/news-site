import type { Nullable } from 'typings/helpers';
import { blockContentFragment } from './queryFragments';
import type { Videoposts } from './types/sanityTypes';
import { getClient } from './utils/getClient';

/*
FRAGMENTS
*/
export const fullProjection = `{
    ...,
    series->,
    author->,
    'isBreaking': isBreaking == true,
    'isFeatured': isFeatured == true,
    'body': body[] ${blockContentFragment}
}`;

// TODO: ordering should come after projections
const ordering = `| order( isBreaking desc, isFeatured desc, datePublished desc )`;

const orderingByDate = `| order(datePublished desc)`;

/*
QUERIES
*/
export const countVideopostsQuery = `count(*[_type == "videoposts" && defined(slug)])`;

export const singleVideopostQuery = `*[_type == "videoposts" && slug.current == $slug] [0] ${fullProjection}`;

export const breakingRailVideopostQuery = `*[_type == "videoposts" && isBreakingDropdown == true && defined(slug.current)] [0] ${fullProjection}`;

export const allVideopostsQuery = `*[_type == "videoposts" && defined(slug)] ${ordering} ${fullProjection}`;

export const someVideopostsQuery = `*[_type == "videoposts" && defined(slug)] ${fullProjection} ${ordering} [0...$quantity] `;

// Don't worry about complex ordering
export const cursoredVideopostsQuery = `*[_type == "videoposts" && defined(slug)]  ${orderingByDate} [$startCursor..$endCursor] ${fullProjection}`;

/*
FETCHERS
*/
export const getVideopostsQuantity = async (preview = false) =>
  getClient(preview).fetch<Nullable<number>>(countVideopostsQuery);

export const getAllVideoposts = async (preview = false) =>
  getClient(preview).fetch<Nullable<Videoposts[]>>(allVideopostsQuery);

export const getSomeVideoposts = async (quantity: number, preview = false) =>
  getClient(preview).fetch<Nullable<Videoposts[]>>(someVideopostsQuery, {
    quantity,
  });

export const getCursoredVideoposts = async (
  startCursor: number,
  endCursor: number,
  preview = false,
) =>
  getClient(preview).fetch<Nullable<Videoposts[]>>(cursoredVideopostsQuery, {
    endCursor,
    startCursor,
  });

export const getBreakingRailVideopost = async () =>
  getClient(false).fetch<Nullable<Videoposts>>(breakingRailVideopostQuery);
