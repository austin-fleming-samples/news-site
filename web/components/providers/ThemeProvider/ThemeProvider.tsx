import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'theme';
import type { ReactNode } from 'react';

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <StyledThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </StyledThemeProvider>
);
