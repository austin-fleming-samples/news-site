import styled from 'styled-components';

export const StyledCard = styled.a<{ isAlerted: boolean }>`
  width: 100%;
  height: auto;
  padding: 1.25rem 1rem;
  text-decoration: none;
  border-radius: 0.75rem;

  ${({ theme, isAlerted }) => isAlerted && `background-color: ${theme.palette.status.alert.main}`};

  &:hover {
    background-color: ${({ theme }) => theme.palette.sage.pale};
  }
`;
