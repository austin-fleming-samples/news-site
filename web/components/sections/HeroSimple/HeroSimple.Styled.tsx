import styled from 'styled-components';

export const StyledSummary = styled.h2`
  ${({ theme }) => theme.typography.body1};
  max-width: 60ch;
  margin-top: 1em;
`;

export const StyledContainer = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.layout.sectionSpacing(0.5)};
  border-bottom: ${({ theme }) => theme.borders.title};
`;
