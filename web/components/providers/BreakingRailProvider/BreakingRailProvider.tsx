import { createContext, useContext, useMemo, useState } from 'react';
import { breakingRail } from '@config/preval';
import type { ReactNode } from 'react';

const defaultState = {
  isOpen: !!breakingRail,
  toggleRail: () => {},
};

const BreakingRailContext = createContext(defaultState);

export const BreakingRailContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(!!breakingRail);
  const toggleRail = () => setIsOpen(!isOpen);

  /* eslint react/jsx-no-constructed-context-values: 0 */
  return (
    <BreakingRailContext.Provider value={{ isOpen, toggleRail }}>
      {children}
    </BreakingRailContext.Provider>
  );
};

export const useBreakingRail = () => useContext(BreakingRailContext);
