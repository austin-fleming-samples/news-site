import { MouseEventHandler } from 'react';
import { StyledLeftArrow, StyledRightArrow } from './Arrows.styled';

export const ArrowLeft = ({ onClickFn }: { onClickFn: MouseEventHandler<SVGSVGElement> }) => (
  <StyledLeftArrow viewBox='0 0 24 24' onClick={onClickFn}>
    <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
  </StyledLeftArrow>
);

export const ArrowRight = ({ onClickFn }: { onClickFn: MouseEventHandler<SVGSVGElement> }) => (
  <StyledRightArrow viewBox='0 0 24 24' onClick={onClickFn}>
    <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
  </StyledRightArrow>
);
