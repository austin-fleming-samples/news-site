import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

// TODO: rename better

const defaultContext = {
  closeMenu: () => {},
  isOpen: false,
  openMenu: () => {},
  toggleMenu: () => {},
};

const navbarContext = createContext(defaultContext);

export const NavbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: should this be useEffect, useState, or something else? Find example.
  const value = useMemo(
    () => ({
      closeMenu: () => setIsOpen(false),
      isOpen,
      openMenu: () => setIsOpen(true),
      toggleMenu: () => setIsOpen(!isOpen),
    }),
    []
  );

  return <navbarContext.Provider value={value}>{children}</navbarContext.Provider>;
};

export const useNavbar = () => {
  const { isOpen, toggleMenu, closeMenu, openMenu } = useContext(navbarContext);
  return { closeMenu, isOpen, openMenu, toggleMenu };
};
