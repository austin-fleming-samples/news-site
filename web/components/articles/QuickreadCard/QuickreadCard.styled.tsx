import styled from 'styled-components';

export const ViewMoreLink = styled.a`
  ${({ theme }) => theme.typography.caption};
  ${({ theme }) => theme.fonts.secondary.regular};
  color: ${({ theme }) => theme.palette.primary.main};
  text-transform: uppercase;
  text-decoration: none;

  ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.palette.olive.main};
    opacity: 0.5;
  }
`;

export const DateDetails = styled.p``;

export const DetailsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-end;

  margin-top: ${({ theme }) => theme.layout.siteGutter(0.25)};
`;

export const CardsWrapper = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.cardWidth(1)};
  height: 450px;
  @media ${({ theme }) => theme.breakpoints.mobileLg.query} {
    height: ${({ theme }) => theme.layout.cardWidth(1)};
  }
`;

export const StyledCardStack = styled.article`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.cardWidth(1)};
  overflow-x: hidden;
`;

// Preview Specific
export const PreviewCardWrapper = styled(CardsWrapper)`
  overflow: auto;
  padding: 0;
  margin: 0;
`;
export const PreviewWrapper = styled.div`
  padding-bottom: 2rem;
`;
export const PreviewContainer = styled(StyledCardStack)`
  overflow: auto;
  padding-bottom: 0.5rem;
`;
