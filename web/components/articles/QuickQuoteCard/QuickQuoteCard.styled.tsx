import styled from 'styled-components';

export const StyledArticle = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & * {
    text-align: center;
  }

  & > * + * {
    padding-top: 1em;
  }
`;
