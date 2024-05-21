import { ReactNode } from 'react';
import type { Quickreads as QuickreadsProps } from '@cms/types/sanityTypes';
import { Typography } from '@components/ui';
import { isoToShortDate } from '@lib/dates';
import dynamic from 'next/dynamic';
import { Page } from './Page';
import type { PageProps } from './Page';
import {
  CardsWrapper,
  DateDetails,
  DetailsWrapper,
  PreviewCardWrapper,
  PreviewContainer,
  PreviewWrapper,
  StyledCardStack,
  ViewMoreLink,
} from './QuickreadCard.styled';

const PrintableCard = dynamic<PageProps>(
  () => import('./PrintableCard').then((mod) => mod.PrintableCard),
  {
    ssr: false,
  },
);

// REF: https://github.com/darenju/react-flip-page
type FlipPageProps = {
  animationDuration?: number;
  // className?: string;
  disableSwipe?: boolean;
  firstComponent?: ReactNode;
  flipOnTouch?: boolean;
  flipOnTouchZone?: number;
  height?: number;
  lastComponent?: ReactNode;
  loopForever?: boolean;
  maskOpacity?: number;
  maxAngle?: number;
  noShadow?: boolean;
  onPageChange?: () => void;
  onStartPageChange?: () => void;
  onStartSwiping?: () => void;
  onStopSwiping?: () => void;
  orientation?: string;
  pageBackground?: string;
  perspective?: string;
  responsive?: boolean;
  reverse?: boolean;
  showHint?: boolean;
  showSwipeHint?: boolean;
  showTouchHint?: boolean;
  startAt?: number;
  style?: object;
  swipeImmune?: string[];
  treshold?: number;
  uncutPages?: boolean;
  width?: number;
};

/* ESNOTE: module isn't typescript */
/* eslint-disable-next-line  @typescript-eslint/ban-ts-comment */
/* @ts-ignore */
const FlipPage = dynamic<FlipPageProps>(() => import('react-flip-page'), {
  ssr: false,
});

export const QuickreadCard = ({
  content,
  showViewSources = true,
  showExpanded = false,
}: {
  content: QuickreadsProps;
  showExpanded?: boolean;
  showViewSources?: boolean;
}) => {
  if (!content) {
    console.error(`No card content found for card. Returning null.`);
    return null;
  }
  const {
    _type,
    title,
    slug,
    datePublished,
    lastModified,
    author,
    tags,
    series,
    colorpaletteclassname,
    mainimage,
    cards,
    body,
    summary,
    aliases,
  } = content;

  if (!cards) {
    console.error(`No card data for card with title: '${title}', slug: '${slug}. Returning null.`);
    return null;
  }

  // HACK: TODO: Big bad one -> cards don't resize on mobile.
  return (
    <StyledCardStack>
      {showExpanded && (
        <PreviewContainer>
          {cards.map((card, stackIndex) => (
            <PreviewWrapper key={card._key}>
              <p>Card {stackIndex + 1}:</p>
              <PrintableCard
                data-density='hard'
                pageContent={content}
                palette={colorpaletteclassname}
                preview={showExpanded}
                stackIndex={stackIndex}
              />
            </PreviewWrapper>
          ))}
          <p>Animated Card:</p>
        </PreviewContainer>
      )}
      <CardsWrapper>
        <FlipPage disableSwipe flipOnTouch loopForever responsive showHint flipOnTouchZone={50}>
          {cards.map((card, stackIndex) => (
            <Page
              key={card._key}
              data-density='hard'
              pageContent={content}
              palette={colorpaletteclassname}
              stackIndex={stackIndex}
            />
          ))}
        </FlipPage>
      </CardsWrapper>

      <DetailsWrapper>
        <Typography tag='p' variant='caption'>
          {isoToShortDate(datePublished)}
        </Typography>
        {showViewSources && (
          <ViewMoreLink href={`/${_type}/${slug.current}`}>View Sources</ViewMoreLink>
        )}
      </DetailsWrapper>
    </StyledCardStack>
  );
};
