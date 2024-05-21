import styled from 'styled-components';

export const TextStyler = styled.div`
  & h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  li {
    margin-bottom: 0.75em;
    line-height: 1.3;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  & h1 {
    ${({ theme }) => theme.typography.h1};
  }

  & h2 {
    ${({ theme }) => theme.typography.h2};
  }

  & h3 {
    ${({ theme }) => theme.typography.h3};
  }

  & h4 {
    ${({ theme }) => theme.typography.h4};
  }

  & h5 {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    ${({ theme }) => theme.typography.h5};
  }

  & h6 {
    ${({ theme }) => theme.typography.h6};
  }

  & a {
    color: ${({ theme }) => theme.palette.olive.main};
    text-decoration: underline;
    pointer-events: all;
    word-break: break-word;

    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      opacity: 0.5;
    }
  }

  & p,
  li {
    ${({ theme }) => theme.typography.bodyLarge};
  }

  & blockquote {
    ${({ theme }) => theme.typography.bodyLarge};
    ${({ theme }) => theme.fonts.secondary.regularItalic};
    position: relative;
    width: 100%;
    padding: ${({ theme }) => `0 ${theme.layout.sectionSpacing(0.5)}`};
    margin: ${({ theme }) => `${theme.layout.sectionSpacing(0.5)} 0`};

    border-width: 0 0 0 3px;
    border-style: solid;
    border-color: ${({ theme }) => theme.palette.sage.main};

    & p {
      font-size: inherit;
      width: 100%;
      padding: 0;
      margin: 0;
    }
  }

  & strong {
    font-weight: bold;
  }

  & em {
    font-style: italic;
  }

  & ul,
  ol {
    list-style: outside;
    padding-left: 1rem;
  }

  & ol {
    list-style-type: lower-alpha;
  }

  & li {
    padding: 0.1em;
  }

  & img,
  iframe {
    width: 100%;
    padding: ${({ theme }) => `${theme.layout.sectionSpacing(0.5)} 0`};
  }
`;
