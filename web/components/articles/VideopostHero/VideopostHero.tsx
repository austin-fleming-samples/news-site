import type { Videoposts as VideopostsProps } from '@cms/types/sanityTypes';
import { PostHero } from '@components/sections';
import { isoToShortDate } from '@lib/dates';

export const VideopostHero = ({ data }: { data: VideopostsProps }) => (
  <PostHero
    eyebrow={data.series?.title || 'Videos'}
    image={data.mainimage}
    modifiedDate={data.lastModified && isoToShortDate(data.lastModified)}
    publishDate={data.datePublished && isoToShortDate(data.datePublished)}
    summary={data.summary}
    tagList={data.tags}
    title={data.title}
  />
);
