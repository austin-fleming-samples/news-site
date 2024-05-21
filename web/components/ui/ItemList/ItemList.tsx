import type { ReactNode } from 'react';
import styled from 'styled-components';

const StyledItemList = styled.ul<{ center: boolean; vertical: boolean }>`
  ${({ center }) => center && `text-align: center;`};

  display: flex;
  ${({ vertical }) =>
    vertical
      ? `
    flex-direction: column;
    justify-content: center;
  `
      : `
    flex-direction: row;
    flex-wrap: wrap;
  `}
`;

export const ItemList = ({
  children,
  vertical = false,
  center = false,
}: {
  center?: boolean;
  children: ReactNode;
  vertical?: boolean;
}) => (
  <StyledItemList center={center} vertical={vertical}>
    {children}
  </StyledItemList>
);
