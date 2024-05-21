import { cloin } from '@lib/cloin';
import S from './Container.module.css';
import type { ContainerProps } from './types';

export const Container = ({
  children,
  fullHeight = false,
  fullVH = false,
  el = 'div',
  center = false,
  width = 'full',
  vertical = false,
  noPadVertical = false,
  className,
}: ContainerProps) => {
  const Component = el;

  const classNames = cloin(
    S.root,
    width === 'narrow' ? S.widthNarrow : S.widthFull,
    fullHeight && S.heightFull,
    fullVH && S.heightScreen,
    center && S.contentCenter,
    vertical && S.contentVertical,
    noPadVertical && S.noVerticalPadding,
    className,
  );

  return <Component className={classNames}>{children}</Component>;
};
