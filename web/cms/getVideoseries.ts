import type { Videoseries } from './types/sanityTypes';
import { getClient } from './utils/getClient';

const fullProjection = `{
    ...
}`;

const ordering = `| order(title asc)`;

export const allVideoseriesQuery = `*[_type == "videoseries" && defined(slug)] ${ordering} ${fullProjection}`;

export const getAllVideoseries = async (preview = false) =>
  getClient(preview).fetch<Videoseries[]>(allVideoseriesQuery);
