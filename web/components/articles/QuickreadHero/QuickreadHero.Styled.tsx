import styled from 'styled-components';

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => `${theme.layout.sectionSpacing(1)} 0`};
  border-bottom: ${({ theme }) => theme.borders.title};
`;

export const StyledHero = styled.section`
  width: 100%;
`;
