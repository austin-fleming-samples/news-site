import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { LinkProps } from '@components/ui';

export type BaseProps = {
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'inverted';
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'fill' | 'outline' | 'ghost' | 'text';
};

/* 
For sponsored: rel="nofollow sponsored noreferrer noopener"
For untrusted external: rel="nofollow noreferrer noopener"
For trusted external: rel="norefferer noopener"
*/

type AsButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: 'button';
  };

type AsLinkProps = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as?: 'link';
    isSponsor?: boolean;
    noFollow?: boolean;
  };

type AsPseudoProps = BaseProps & { as?: 'pseudo'; to?: string };

export type PolyButtonProps = AsButtonProps | AsLinkProps | AsPseudoProps;
