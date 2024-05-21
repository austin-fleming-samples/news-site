import styled from 'styled-components';

export const StyledLabel = styled.label`
  ${({ theme }) => theme.typography.caption};

  font-weight: bold;

  display: block;

  margin-bottom: 0.5em;
`;

export const StyledInput = styled.input<{ isFocused?: boolean }>`
  ${({ theme }) => theme.typography.body1}

  width: 100%;
  max-width: 60ch;
  padding: 0.625em 1em;
  text-align: left;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.palette.sage.main : theme.palette.olive.main};
  border-width: 2px;
  border-style: solid;
  border-radius: none;
`;
