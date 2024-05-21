import styled from 'styled-components';

export const CardText = styled.div`
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
    font-size: 16px;
  }

  & strong {
    font-weight: 800;
  }

  & p {
    margin-bottom: 1em;
  }

  & h1 {
    font-size: 1.875em;
    /* import */
    /* @include beta-bold; */
    margin-bottom: 1em;
  }

  & h2 {
    font-size: 1.5em;
    /* import */
    /* @include beta-bold; */
    margin-bottom: 1em;
  }

  & h3 {
    font-size: 1.375em;
    /* import */
    /* @include gamma-regular; */
    margin-bottom: 1em;
  }

  & h4 {
    font-size: 1em;
    /* import */
    /* @include gamma-regular; */
    text-transform: uppercase;
    text-decoration: underline;
  }

  & h5 {
    font-size: 0.875em;
    /* import */
    /* @include gamma-bold; */
    letter-spacing: 0.05em;
  }

  & h6 {
    font-size: 16px;
    /* import */
    /* @include gamma-regular; */
    margin-bottom: 0.625em;
    text-align: left;
  }

  & a {
    color: $color-brand-olive;
    @include hover-link;
    text-decoration: underline;
  }

  li {
    padding: 0.1em;
    font-size: 1em;
  }

  & blockquote {
    margin-bottom: 1em;
    font-size: 1.125em;
    @include beta-regular;
    border: none;

    & p {
      font-size: inherit;
      width: 100%;
      padding: 0;
      margin: 0;
    }
  }

  & strong {
  }

  & em {
  }

  & ul,
  & ol {
    padding-left: 1em;
  }

  & ul {
    text-align: center;
    align-items: left;
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

  & img,
  iframe {
    width: 100%;
    /* import */
    /* padding: ($post-section-spacing/2) 0; */
  }

  & div {
    text-align: center;
  }
`;
