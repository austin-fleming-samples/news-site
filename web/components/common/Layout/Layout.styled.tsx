import styled from 'styled-components';

export const StyledMain = styled.main`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  margin-top: ${({ theme }) => theme.layout.siteGutter(2)};
  margin-bottom: ${({ theme }) => theme.layout.sectionSpacing(2)};
`;
