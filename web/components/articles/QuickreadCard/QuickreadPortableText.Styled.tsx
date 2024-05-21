import styled from 'styled-components';

export const ContentContainer = styled.div<{ textColor: string }>`
  ${({ theme }) => theme.fonts.tertiary.regular};
  color: ${({ textColor }) => textColor};

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;

  font-size: 14px;
  @media ${({ theme }) => theme.breakpoints.mobileLg.query} {
    font-size: 16px;
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  ul,
  ol,
  li,
  blockquote {
    padding: 0;
    margin: 0;
    line-height: 1.4;
    text-align: center;
    text-transform: none;
    width: 100%;
  }

  & .leftAlign {
    display: inline-block;
    text-align: left;
    align-self: flex-start;
    justify-self: flex-start;
    width: 100%;
  }

  & strong {
    font-weight: 800;
  }

  & em {
    font-style: italic;
  }

  & p {
    margin-bottom: 1em;
  }

  & h1 {
    font-size: 1.875em;
    ${({ theme }) => theme.fonts.secondary.bold};
    margin-bottom: 1em;
  }

  & h2 {
    font-size: 1.5em;
    ${({ theme }) => theme.fonts.secondary.bold};
    margin-bottom: 1em;
  }

  & h3 {
    font-size: 1.375em;
    ${({ theme }) => theme.fonts.tertiary.regular};
    margin-bottom: 1em;
  }

  & h4 {
    font-size: 1em;
    ${({ theme }) => theme.fonts.tertiary.regular};
    text-transform: uppercase;
    text-decoration: underline;
  }

  & h5 {
    font-size: 0.875em;
    ${({ theme }) => theme.fonts.tertiary.bold};
    letter-spacing: 0.05em;
  }

  & h6 {
    font-size: 1em;
    ${({ theme }) => theme.fonts.tertiary.regular};
    margin-bottom: 0.625em;
    text-align: left;
    display: inline-block;
  }

  & a {
    color: ${({ theme }) => theme.palette.olive.main};
    text-decoration: underline;

    ${({ theme }) => theme.transitions.fast};
    &:hover {
      opacity: 0.5;
    }
  }

  & ul,
  ol {
    padding-left: 1em;
    width: 100%;
  }

  & ul {
    text-align: center;
    align-items: left;
    list-style: outside;
    & li {
      text-align: left;
    }
  }

  & ol {
    text-align: center;
    & li {
      text-align: left;
    }
  }

  & li {
    padding: 0.1em;
    font-size: 1em;
    ${({ theme }) => theme.fonts.tertiary.regular};

    & .leftAlign {
      display: inline; /* Guard against someone applying leftAlign to a list */
    }
  }

  & blockquote {
    font-size: 1.125em;
    ${({ theme }) => theme.fonts.secondary.regular};
    margin-bottom: 1em;
    border: none;

    & p {
      font-size: inherit;
      width: 100%;
      padding: 0;
      margin: 0;
    }
  }

  & div {
    text-align: center;
  }


`;
