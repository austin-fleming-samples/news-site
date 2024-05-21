import styled from 'styled-components';

export const AuthorImageWrapper = styled.div`
  /* width: ${({ theme }) => theme.layout.cardWidth(0.5)};
  height: ${({ theme }) => theme.layout.cardWidth(0.5)}; */
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;

  @media ${({ theme }) => theme.breakpoints.tablet.query} {
    margin-right: ${({ theme }) => theme.layout.siteGutter(2)};
  }
`;

export const ImagePane = styled.div`
  width: 50%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.breakpoints.tablet.query} {
    align-items: flex-end;
  }
`;

export const TextContainer = styled.div`
  width: 50%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: ${({ theme }) => theme.layout.siteGutter(1)};

  @media ${({ theme }) => theme.breakpoints.tablet.query} {
    align-items: flex-start;
    text-align: left;
  }
`;

export const AuthorLinkContainer = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  max-width: 600px;

  * {
    max-width: 60ch;
    margin-bottom: 0.5rem;
  }

  @media ${({ theme }) => theme.breakpoints.tablet.query} {
    flex-direction: row;
    align-items: flex-start;
  }
`;
