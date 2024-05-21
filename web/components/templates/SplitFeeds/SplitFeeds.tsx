import { ReactNode } from 'react';
import { Container } from '@components/layout';
import { FeedsWrapper } from './SplitFeeds.styled';

type SplitFeedsProps = {
  mainFeed: ReactNode;
  sideFeed: ReactNode;
};

export const SplitFeeds = ({ mainFeed, sideFeed }: SplitFeedsProps) => (
  <Container fullHeight>
    <FeedsWrapper>
      <div key='mainFeed'>{mainFeed}</div>
      <div key='sideFeed'>{sideFeed}</div>
    </FeedsWrapper>
  </Container>
);
