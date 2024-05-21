import type { Quickquotes } from '@cms/types/sanityTypes';
import { Card, Typography } from '@components/ui';
import { isoToShortDate } from '@lib/dates';
import { addCurlyQuotes } from '@lib/strings';
import { StyledArticle } from './QuickQuoteCard.styled';

export const QuickQuoteCard = ({
  title,
  _type,
  slug,
  isBreaking,
  datePublished,
  featured_quote,
}: Quickquotes) => {
  // TODO: centralize this function -- either normalize or lib function.
  const quotedText = addCurlyQuotes(featured_quote.quote);
  const summaryText = featured_quote.citation || featured_quote.summary || title;
  const date = isoToShortDate(datePublished);

  return (
    <Card isAlerted={isBreaking} link={`/${_type}/${slug.current}`}>
      <StyledArticle>
        <Typography key='title' tag='h1' variant='h5'>
          {quotedText}
        </Typography>

        <Typography key='subtitle' tag='h2' variant='body1'>
          {summaryText}
        </Typography>

        {date && (
          <Typography key='date' tag='p' variant='overline'>
            {date}
          </Typography>
        )}
      </StyledArticle>
    </Card>
  );
};
