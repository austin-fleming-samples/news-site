import styled from 'styled-components';

const ProtoArrow = styled.svg.attrs({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  fill: #fff;
  cursor: pointer;
`;

export const StyledLeftArrow = styled(ProtoArrow)`
  left: 5px;
  right: auto;
`;

export const StyledRightArrow = styled(ProtoArrow)`
  left: auto;
  right: 5px;
`;
