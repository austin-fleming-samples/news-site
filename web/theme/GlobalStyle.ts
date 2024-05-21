import { createGlobalStyle } from 'styled-components';
import { styledReset } from './reset';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
    ${styledReset}

    body {
        background-color: ${theme.palette.white.main};
        ${theme.typography.body1};
        min-height: 100%;
    }

    #__next  {
      height: 100%;
    }

    a {
        text-decoration: underline;
        color: ${theme.palette.olive.main};
        transition: ${theme.transitions.main};

        &:hover {
            color: ${theme.palette.olive.light};
        }
    }
`;
