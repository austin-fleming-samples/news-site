import styled from 'styled-components';

export const StyledLink = styled.a`
  ${({ theme }) => theme.typography.button2}
`;

// TODO: centralize style
export const StyledTitle = styled.p`
  ${({ theme }) => theme.typography.body1}
  ${({ theme }) => theme.fonts.primary.bold}

  text-transform: uppercase;
  letter-spacing: 0.08em;
  line-height: 1;
  padding-top: 1em;
`;

export const StyledSectionHeading = styled.header`
  width: 100%;
  position: sticky;
  top: ${({ theme }) => theme.layout.navHeight(1)};
  padding-bottom: 0.25rem;

  border-bottom: ${({ theme }) => theme.borders.title};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  background-color: ${({ theme }) => theme.palette.background.main};

  z-index: ${({ theme }) => theme.zIndex.headerSecondary};
`;
