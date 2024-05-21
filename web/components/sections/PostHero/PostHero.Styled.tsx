import styled from 'styled-components';

export const TagBlock = styled.span`
  margin-right: ${({ theme }) => theme.layout.siteGutter(1)};
  margin-bottom: ${({ theme }) => theme.layout.siteGutter(1)};

  ${({ theme }) => theme.typography.button2}

  color: ${({ theme }) => theme.palette.olive.main};

  display: block;
  padding: 0.625em 2em;

  border-width: 1px;
  border-style: solid;
  border-color: currentColor;
`;

export const TagGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.layout.siteGutter(2)};
`;

export const DateTitle = styled.div`
  ${({ theme }) => theme.typography.caption};
  text-transform: none;
`;

export const DateBlock = styled.div``;

export const DateGroup = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  gap: ${({ theme }) => theme.layout.siteGutter(2)};
  margin-top: ${({ theme }) => theme.layout.siteGutter(2)};

  @media ${({ theme }) => theme.breakpoints.tablet.query} {
    grid-template-columns: auto auto;
  }
`;

export const TitleGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: ${({ theme }) => theme.layout.siteGutter(1)};
`;

export const TextPane = styled.div<{ isFullwidth: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & * {
    text-align: center;
  }

  @media ${({ theme }) => theme.breakpoints.tablet.query} {
    min-height: 100%;

    ${({ isFullwidth, theme }) =>
      isFullwidth
        ? `
        padding: ${theme.layout.sectionSpacing(1)} 0;
        grid-column: -1/1;
        width: 60%;
        margin-left: auto;
        margin-right: auto;
        align-items: center;
        & * {
          text-align: center;
        }
      `
        : `
        align-items: flex-start;
        & * {
          text-align: left;
        }
      `}
  }
`;

export const ImagePane = styled.figure`
  width: 100%;
  height: 100%;
  min-height: 100%;
  position: relative;
  padding-bottom: 100%;
`;

export const SplitPane = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.layout.siteGutter(2)};

  padding-bottom: ${({ theme }) => theme.layout.sectionSpacing(1)};
  border-bottom: ${({ theme }) => theme.borders.title};

  @media ${({ theme }) => theme.breakpoints.tablet.query} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const StyledHero = styled.section`
  width: 100%;
`;
