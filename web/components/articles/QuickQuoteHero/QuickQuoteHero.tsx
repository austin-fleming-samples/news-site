import type { Quickquotes as QuickquotesProps } from '@cms/types/sanityTypes';
import { PostHero } from '@components/sections';
import { isoToShortDate } from '@lib/dates';
import { addCurlyQuotes } from '@lib/strings';

export const QuickQuoteHero = ({ data }: { data: QuickquotesProps }) => (
  <PostHero
    caption={data.featured_quote.citation}
    // TODO: [SEO] why is series missing?
    /* eyebrow={data?.series?.title || 'Quick Quotes'} */
    image={data.mainimage}
    modifiedDate={data.lastModified && isoToShortDate(data.lastModified)}
    publishDate={data.datePublished && isoToShortDate(data.datePublished)}
    summary={data.featured_quote.summary}
    tagList={data.tags}
    title={addCurlyQuotes(data.featured_quote.quote)}
  />
);
