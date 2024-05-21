import { LoadingDots, Link } from '@components/ui';
import { cloin } from '@lib/cloin';
import S from './PolyButton.module.css';
import type { PolyButtonProps, BaseProps } from './types';

const getVariantClass = (variant: NonNullable<BaseProps['variant']>): string =>
  ({
    fill: S.variantFill,
    ghost: S.variantGhost,
    outline: S.variantOutline,
    text: S.variantText,
  }[`${variant}`]);

const getColorClass = (color: NonNullable<BaseProps['color']>): string =>
  ({
    inverted: S.colorInverted,
    primary: S.colorPrimary,
    secondary: S.colorSecondary,
  }[`${color}`]);

const getSizeClass = (size: NonNullable<BaseProps['size']>): string =>
  ({
    lg: 'buttonLarge',
    md: 'buttonBase',
    sm: 'buttonSmall',
  }[`${size}`]);

export const PolyButton = ({
  className,
  variant = 'text',
  color = 'primary',
  size = 'md',
  isDisabled,
  isLoading,
  ...rest
}: PolyButtonProps) => {
  const { as } = rest;

  const classNames = cloin(
    S.root,
    getVariantClass(variant),
    getColorClass(color),
    getSizeClass(size),
    isLoading && S.isLoading,
    isDisabled && S.isDisabled,
    className,
  );

  if (as === 'button') {
    const { as: buttonAs, type = 'button', children, ...buttonRest } = rest;

    return (
      <button
        aria-disabled={isDisabled || isLoading}
        className={classNames}
        disabled={isDisabled || isLoading}
        // ESNOTE: destructured property has fallback
        // eslint-disable-next-line react/button-has-type
        type={type}
        {...buttonRest}>
        {isLoading && <LoadingDots />}
        {children}
      </button>
    );
  }

  if (as === 'link') {
    const { as: linkAs, children, ...linkRest } = rest;

    return (
      <Link className={classNames} isDisabled={isDisabled} {...linkRest}>
        {children}
      </Link>
    );
  }

  if (as === 'pseudo' || !as) {
    const { as: pseudoAs, children, ...pseudoRest } = rest;

    return (
      <span className={cloin(classNames, S.isPseudo)} {...pseudoRest}>
        {children}
      </span>
    );
  }

  throw new Error('Button component must have property "as" set.');
};
