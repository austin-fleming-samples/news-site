import type { ReactNode } from 'react';

export const IDMarker = ({ title, children }: { children: ReactNode; title: string }) => (
  <span id={title}>{children}</span>
);
