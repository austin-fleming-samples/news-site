import styled from 'styled-components';

export const ItemList = styled.ul<{ center?: boolean; vertical?: boolean }>`
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

export const StyledPageLinkTitle = styled.p`
  ${({ theme }) => theme.typography.h6};

  text-transform: uppercase;
  font-weight: normal;
`;

export const StyledPageLink = styled.a<{ pad?: boolean }>`
  ${({ theme }) => theme.typography.overline};
  display: block;
  text-decoration: none;
  text-transform: capitalize;

  ${({ pad, theme }) => pad && `padding: ${theme.layout.siteGutter(0.5)}`};

  padding-top: 1em;

  &:hover {
    text-decoration: underline;
  }
`;

export const PageList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => `0 ${theme.layout.siteGutter(1)}`};
`;

export const StyledFooterLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const StyledCtaLink = styled.a`
  ${({ theme }) => theme.typography.h4};
  text-transform: uppercase;
`;

export const StyledCta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  * {
    max-width: 50ch;
    margin-bottom: 1em;
  }
`;

// MAIN

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.layout.sectionSpacing(0.5)} 0`};
`;

export const StyledFooter = styled.footer`
  width: 100%;
  height: 100%;
  border-top: ${({ theme }) => theme.borders.main};
  padding: ${({ theme }) => `${theme.layout.sectionSpacing(0.5)} 0`};
`;
