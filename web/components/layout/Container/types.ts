import type { ReactNode } from 'react';

type WidthProps = 'full' | 'narrow';

type TagProps = 'div' | 'article' | 'section' | 'nav';

export type ContainerProps = {
  center?: boolean;
  children?: ReactNode;
  className?: string;
  el?: TagProps;
  fullHeight?: boolean;
  fullVH?: boolean;
  noPadVertical?: boolean;
  vertical?: boolean;
  width?: WidthProps;
};
