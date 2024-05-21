import type { ReactNode } from 'react';
import type { WidgetStyles } from '@cms/types/codegen';
import S from './WidgetWrapper.module.css';

type WidgetColor = WidgetStyles['color'];

const colorClassSelector = (color: WidgetColor) =>
  ({
    BLUE_SKY: S.colorBlueSky,
    BLUSH: S.colorBlush,
    LAVENDER: S.colorLavender,
    MINT: S.colorMint,
    WHITE: S.colorWhite,
  }[`${color}`]);

interface WidgetWrapperProps {
  children: ReactNode;
  color: WidgetColor;
}

export const WidgetWrapper = ({ children, color }: WidgetWrapperProps) => (
  <div className={`${S.root} ${colorClassSelector(color)}`}>{children}</div>
);
