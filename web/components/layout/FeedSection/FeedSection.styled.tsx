import styled from 'styled-components';

export const SideGrid = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;

  padding-bottom: ${({ theme }) => theme.layout.siteGutter(4)};
  padding-top: ${({ theme }) => theme.layout.siteGutter(2)};

  & * {
    margin-bottom: ${({ theme }) => theme.layout.siteGutter(1)};
  }
`;

export const FullWidthContainer = styled.main`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  padding-bottom: ${({ theme }) => theme.layout.siteGutter(4)};
  padding-top: ${({ theme }) => theme.layout.siteGutter(2)};
`;

export const MainGrid = styled(FullWidthContainer)`
  gap: ${({ theme }) => theme.layout.siteGutter(1)};

  @media ${({ theme }) => theme.breakpoints.mobileLg.query} {
  }

  @media ${({ theme }) => theme.breakpoints.tablet.query} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${({ theme }) => theme.breakpoints.desktop.query} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${({ theme }) => theme.breakpoints.desktopLg.query} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const StyledFeedSection = styled.section<{ isMobileOnly: boolean; isSideFeed: boolean }>`
  width: 100%;
  position: relative;

  ${({ isMobileOnly, theme }) =>
    isMobileOnly &&
    `
    @media ${theme.breakpoints.desktop.query} {
      display: none;
      visibility: hidden;
    }
  `}

  ${({ isSideFeed, theme }) =>
    isSideFeed &&
    `
        display: none;
        visibility: hidden;

        @media ${theme.breakpoints.desktop.query} {
            display: block;
            visibility: visible;
        }
    `}
`;
