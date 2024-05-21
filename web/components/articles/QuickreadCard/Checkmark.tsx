import styled from 'styled-components';

const buildCheckmarkSvg = (hexString: string) => {
  const color = `%23${hexString.slice(1)}`;

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" viewBox="0 0 24 24" width="96px" height="96px"><path d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"/></svg>`;
};

export const Checkmark = styled.div<{ textHexColor: string }>`
  background-image: ${({ textHexColor }) => `url('${buildCheckmarkSvg(textHexColor)}')`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  width: 64px;
  height: 80px;
  margin-top: 16px;
  margin-left: 10px;
`;
