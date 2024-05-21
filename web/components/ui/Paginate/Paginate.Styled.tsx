import styled from 'styled-components';

export const StyledRule = styled.hr`
  width: 100%;
  height: 1px;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.primary.main};
`;

export const StyledPageLink = styled.a<{ isHighlighted?: boolean; isInactive?: boolean }>`
  ${({ theme }) => theme.typography.body1}
  text-decoration: none;

  ${({ isInactive }) =>
    isInactive &&
    `
    pointer-events: none;
    opacity: 0.5;
  `}

  ${({ isHighlighted }) =>
    isHighlighted &&
    `
    font-weight: bold;
  `}
`;

export const StyledPageItem = styled.li`
  padding: 0 0.5rem;
`;

export const StyledPaginatorList = styled.ul`
  padding: 0 1rem;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;
