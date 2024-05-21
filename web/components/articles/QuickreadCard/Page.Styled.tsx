import styled from 'styled-components';

const CARD_PADDING = '16px';
const CARD_PADDING_RIGHT = '15.5px'; // NOTE: a slight shift to accomodate legacy content.

export const Citation = styled.p<{ color: string }>`
  ${({ theme }) => theme.fonts.tertiary.regular};
  color: ${({ color }) => color};
  display: inline-block;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0;
  margin: 0;
  text-align: center;
`;

export const MainContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & * {
    overflow-wrap: break-word;
  }
`;

export const GlassesIcon = styled.img`
  height: 50%;
  padding: 0;
`;

export const SeriesName = styled.p<{ color: string }>`
  text-align: center;
  white-space: nowrap;
  padding: 0 8px;

  color: ${({ color }) => color};
  font-size: 12px;
  ${({ theme }) => theme.fonts.tertiary.regular};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const BorderPiece = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid currentColor;
`;

export const BorderDetailsUpper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 32px;
  margin: -${CARD_PADDING} 0 0 0;
  padding: 0;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
`;

export const BorderDetailsLower = styled(BorderDetailsUpper)`
  top: auto;
  bottom: 0;
  margin: 0 0 -${CARD_PADDING} 0;
`;

export const StyledBorder = styled.div<{ borderColor: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${CARD_PADDING};
  padding-right: ${CARD_PADDING_RIGHT};

  border-width: 1px;
  border-style: solid;
  border-width: 0 1px;
  border-color: ${({ borderColor }) => borderColor};

  & ${BorderPiece} {
    border-color: ${({ borderColor }) => borderColor};
  }
`;

export const StyledBody = styled.div`
  width: 100%;
  height: 100%;
  padding: ${CARD_PADDING};
`;

export const StyledBackgroundImage = styled.img`
  position: absolute;
  top: 0;
  /* right: 0;
  bottom: 0; */
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
`;

export const StyledCard = styled.div<{
  backgroundColor: string;
  backgroundImage?: string;
  preview?: boolean;
}>`
  width: 100%;
  max-width: 400px;
  position: relative;
  height: ${({ preview }) => (preview ? '100%' : '200%')};

  /* ${({ backgroundImage }) =>
    backgroundImage &&
    `
    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: '';
      background-image: url("${backgroundImage}");
      background-size: cover;
      opacity: 0.15;
    }
  `} */

  background-color: ${({ backgroundColor }) => backgroundColor};
`;
