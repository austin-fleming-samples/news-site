import { Container, SectionContainer } from '@components/layout';
import { SectionHeading } from '@components/ui';
import styled from 'styled-components';
import type { ReactNode } from 'react';
// TODO: Confusing that this is called 'section'. maybe 'grid'?
const CardGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: ${({ theme }) => theme.layout.siteGutter(1)};
  margin-top: ${({ theme }) => theme.layout.siteGutter(2)};
  margin-bottom: ${({ theme }) => theme.layout.siteGutter(4)};

  @media ${({ theme }) => theme.breakpoints.tablet.query} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${({ theme }) => theme.breakpoints.desktop.query} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media ${({ theme }) => theme.breakpoints.desktopLg.query} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

// HACK: this now has the same component as 'layout/CardGrid' combine the two.

export const CardSection = ({ title, children }: { children: ReactNode; title: string }) => (
  /* TODO: aria-label not currently working */
  <SectionContainer aria-label='article list'>
    <Container>
      <SectionHeading title={title} />
      <CardGrid>{children}</CardGrid>
    </Container>
  </SectionContainer>
);
