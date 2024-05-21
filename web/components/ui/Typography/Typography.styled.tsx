import styled from 'styled-components';
import type { VariantOptionProps } from './types';

export const StyledTypography = styled.p<{
  center: boolean;
  strikeThrough: boolean;
  variant: VariantOptionProps;
}>`
  ${({ theme, variant }) => theme.typography[variant]};
  ${({ center }) => center && `text-align:center;`};
  ${({ strikeThrough }) => strikeThrough && `text-decoration: line-through`};
`;
