import styled from 'styled-components';

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const StyledInfoBox = styled.div`
  display: block;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-end;
`;

export const StyledImageWrapper = styled.figure`
  display: block;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

// TODO: add featured emphasis
export const StyledCard = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & > * {
    margin-bottom: ${({ theme }) => theme.layout.siteGutter(0.5)};
  }
`;

export const StyledCardWrapper = styled.a`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.cardWidth(1)};
  display: block;
  text-decoration: none;
`;
