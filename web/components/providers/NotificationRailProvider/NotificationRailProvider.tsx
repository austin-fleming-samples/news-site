import { createContext, useContext, useMemo, useState } from 'react';
import { notificationRail } from '@config/preval';
import type { ReactNode } from 'react';

const defaultState = {
  isOpen: notificationRail.isActive,
  toggleRail: () => {},
};

const NotificationRailContext = createContext(defaultState);

export const NotificationRailContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(notificationRail.isActive);
  const toggleRail = () => setIsOpen(!isOpen);

  return (
    <NotificationRailContext.Provider value={{ isOpen, toggleRail }}>
      {children}
    </NotificationRailContext.Provider>
  );
};

export const useNotificationRail = () => useContext(NotificationRailContext);
