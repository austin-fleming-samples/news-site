import type { ReactNode } from 'react';
import {
  BreakingRailContextProvider,
  NavbarContextProvider,
  NotificationRailContextProvider,
  ThemeProvider,
} from '@components/providers';

export const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <BreakingRailContextProvider>
      <NavbarContextProvider>
        <NotificationRailContextProvider>{children}</NotificationRailContextProvider>
      </NavbarContextProvider>
    </BreakingRailContextProvider>
  </ThemeProvider>
);
