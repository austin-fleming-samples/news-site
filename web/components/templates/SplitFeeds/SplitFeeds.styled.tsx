import styled from 'styled-components';

export const FeedsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: ${({ theme }) => theme.layout.siteGutter(1)};

  @media ${({ theme }) => theme.breakpoints.mobileLg.query} {
    grid-template-columns: 1fr;
  }

  @media ${({ theme }) => theme.breakpoints.tablet.query} {
    grid-template-columns: 1fr;
  }

  @media ${({ theme }) => theme.breakpoints.desktop.query} {
    grid-template-columns: 2fr 1fr;
  }

  @media ${({ theme }) => theme.breakpoints.desktopLg.query} {
    grid-template-columns: 3fr 1fr;
  }
`;
