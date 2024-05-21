import styled from 'styled-components';

export const FormButton = styled.button`
  ${({ theme }) => theme.typography.button1}
  padding: 0.625em 2em;
  background-color: ${({ theme }) => theme.palette.olive.main};
  color: ${({ theme }) => theme.palette.olive.contrastText};
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.olive.main};

  margin: 1rem 0;

  transition: ${({ theme }) => theme.transitions.fast};
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.palette.olive.main};
  }
`;

export const StyledSubtitle = styled.p`
  ${({ theme }) => theme.typography.body1}
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: center;
  padding-bottom: 1rem;
`;

export const StyledTitle = styled.p`
  ${({ theme }) => theme.typography.h3}
  padding-bottom: 2rem;
  text-align: center;
`;

export const StyledInput = styled.input<{ isFocused?: boolean }>`
  ${({ theme }) => theme.typography.body1}

  width: 100%;
  max-width: 60ch;
  padding: 0.625em 1em;
  text-align: center;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.palette.sage.main : theme.palette.olive.main};
  border-width: 2px;
  border-style: solid;
  border-radius: none;
`;

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => `${theme.layout.siteGutter(4)} 0`};
`;
