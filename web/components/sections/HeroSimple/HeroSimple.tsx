import type { HeroSimple as HeroSimpleProps } from '@cms/types/sanityTypes';
import { Container, SectionContainer } from '@components/layout';
import { Typography } from '@components/ui';
import { StyledContainer, StyledSummary } from './HeroSimple.Styled';

export const HeroSimple = ({ title, summary }: HeroSimpleProps) => (
  <Container>
    <StyledContainer>
      <Typography tag='h1' variant='h2'>
        {title}
      </Typography>
      {summary && <StyledSummary>{summary}</StyledSummary>}
    </StyledContainer>
  </Container>
);
