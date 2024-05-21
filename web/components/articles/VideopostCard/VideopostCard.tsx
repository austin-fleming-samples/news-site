import type { Videoposts as VideopostsProps } from '@cms/types/sanityTypes';
import { DetailedCard } from '@components/ui';
import { isoToShortDate } from '@lib/dates';

export const VideopostCard = ({
  _type,
  title,
  slug,
  datePublished,
  series,
  mainimage,
  summary,
  isBreaking,
  isFeatured,
}: VideopostsProps) => (
  <DetailedCard
    date={isoToShortDate(datePublished)}
    image={mainimage}
    isBreaking={isBreaking}
    isFeatured={isFeatured}
    link={`/${_type}/${slug.current}`}
    overline={series?.title}
    summary={summary}
    title={title}
  />
);
