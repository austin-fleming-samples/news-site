import type { ReactNode } from 'react';
import { cloin } from '@lib/cloin';
import S from './SectionContainer.module.css';

export const SectionContainer = ({
  children,
  el = 'section',
  className,
}: {
  children: ReactNode;
  className?: string;
  el?: 'div' | 'section' | 'article' | 'nav' | 'header';
}) => {
  const Component = el;

  return <Component className={cloin(S.root, className)}>{children}</Component>;
};
