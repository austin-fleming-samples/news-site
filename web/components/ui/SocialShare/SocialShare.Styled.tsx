import styled from 'styled-components';

export const StyledAside = styled.aside`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: ${({ theme }) => `${theme.layout.sectionSpacing(1)} 0`};

  & .share__title {
    ${({ theme }) => theme.typography.caption};
    font-weight: bold;
    display: block;
    text-align: center;
    padding-bottom: 1rem;
  }

  & .share__links {
    display: inline-block;
    margin: 0 auto;
  }

  & .share__link {
    transition: ${({ theme }) => theme.transitions.fast};
    &:hover {
      opacity: 0.5;
    }
  }
`;
