import styled from 'styled-components';

export const StyledNavLink = styled.a<{ fillContainer: boolean }>`
  ${({ theme }) => theme.typography.caption}
  ${({ theme }) => theme.fonts.secondary.bold}

  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: none;
  line-height: 1;

  transition: ${({ theme }) => theme.transitions.fast};

  ${({ fillContainer, theme }) =>
    fillContainer
      ? `
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
      padding-top: ${theme.layout.siteGutter(2)};
      padding-bottom: ${theme.layout.siteGutter(2)};

      &:focus {
        background-color: ${theme.palette.blush.main};
      }

      &:hover, &:active {
        background-color: ${theme.palette.sage.pale};
      }
    `
      : `
      &:hover {
        opacity: 0.5;
      
    `}
`;
