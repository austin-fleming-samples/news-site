import styled from 'styled-components';

export const StyledWrapper = styled.div<{
  bottomPaddingPercentage: number;
  fillContainer: boolean;
}>`
  display: block;
  width: 100%;
  position: relative;
  ${({ bottomPaddingPercentage, fillContainer }) =>
    fillContainer ? `height: 100%;` : `padding-bottom: ${bottomPaddingPercentage}%;`}
  overflow: hidden;
`;
