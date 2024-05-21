import styled from 'styled-components';
import type { ReactNode } from 'react';
// TODO: Confusing that this is called 'section'. maybe 'grid'?
const StyledGrid = styled.div`
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

export const CardGrid = ({ children }: { children: ReactNode }) => (
  <StyledGrid>{children}</StyledGrid>
);
