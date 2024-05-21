import type { Nullable } from 'typings/helpers';
import { blockContentFragment } from './queryFragments';
import type { Quickreads } from './types/sanityTypes';
import { getClient } from './utils/getClient';

/*
FRAGMENTS
*/
export const fullProjection = `{
    ...,
    series->,
    author->,
    'body': body[] ${blockContentFragment}
}`;

const ordering = `| order( datePublished desc )`;

/*
QUERIES
*/
export const countQuickreadsQuery = `count(*[_type == "quickreads" && defined(slug)])`;

export const singleQuickreadQuery = `*[_type == "quickreads" && slug.current == $slug]
    [0]
    ${fullProjection}`;

export const allQuickreadsQuery = `*[_type == "quickreads" && defined(slug)]
    ${ordering}
    ${fullProjection}`;

export const someQuickreadsQuery = `*[_type == "quickreads" && defined(slug)]
    ${fullProjection}
    ${ordering}
    [0...$quantity]
    `; //

export const cursoredQuickreadsQuery = `*[_type == "quickreads" && defined(slug)]
    ${ordering}
    [$startCursor..$endCursor]
    ${fullProjection}`;

/*
FETCHERS
*/
export const getQuickreadsQuantity = async (preview = false) =>
  getClient(preview).fetch<Nullable<number>>(countQuickreadsQuery);

export const getAllQuickreads = async (preview = false) =>
  getClient(preview).fetch<Nullable<Quickreads[]>>(allQuickreadsQuery);

export const getSomeQuickreads = async (quantity: number, preview = false) =>
  getClient(preview).fetch<Nullable<Quickreads[]>>(someQuickreadsQuery, {
    quantity,
  });

export const getCursoredQuickreads = async (
  startCursor: number,
  endCursor: number,
  preview = false,
) =>
  getClient(preview).fetch<Nullable<Quickreads[]>>(cursoredQuickreadsQuery, {
    endCursor,
    startCursor,
  });
