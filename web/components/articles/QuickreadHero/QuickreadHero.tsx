import type { Quickreads as QuickreadsProps } from '@cms/types/sanityTypes';
import { QuickreadCard } from '@components/articles';
import { Container } from '@components/layout';
import { StyledContent, StyledHero } from './QuickreadHero.Styled';

// HACK: preview should be a global state probably
export const QuickreadHero = ({
  data,
  preview = false,
}: {
  data: QuickreadsProps;
  preview?: boolean;
}) => (
  <StyledHero>
    <Container>
      <StyledContent>
        <QuickreadCard content={data} showExpanded={preview} showViewSources={false} />
      </StyledContent>
    </Container>
  </StyledHero>
);
