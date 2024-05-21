import type { ReactNode } from 'react';
import { SectionHeading } from '@components/ui';
import { FullWidthContainer, MainGrid, SideGrid, StyledFeedSection } from './FeedSection.styled';

type FeedSectionProps = {
  children?: ReactNode;
  isFullWidth?: boolean;
  isMobileOnly?: boolean;
  isSideFeed?: boolean;
  link?: string;
  linkLabel?: string;
  title: string;
};

export const FeedSection = ({
  children,
  isSideFeed = false,
  title,
  link,
  linkLabel,
  isFullWidth = false,
  isMobileOnly = false,
}: FeedSectionProps) => {
  const GridComponent = isSideFeed ? SideGrid : MainGrid;

  return (
    <StyledFeedSection isMobileOnly={isMobileOnly} isSideFeed={isSideFeed}>
      <SectionHeading link={link} linkLabel={linkLabel} title={title} />
      {isFullWidth ? (
        <FullWidthContainer>{children}</FullWidthContainer>
      ) : (
        <GridComponent>{children}</GridComponent>
      )}
    </StyledFeedSection>
  );
};
