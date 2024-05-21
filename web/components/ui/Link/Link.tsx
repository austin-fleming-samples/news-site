// ESNOTE: href is applied through NextLink
/*  eslint-disable jsx-a11y/anchor-is-valid */
import type { ReactNode } from 'react';
import NextLink from 'next/link';

/* 
  Wrapper for next/link to simplify interface and easy maintainable should next's api change.

  Prefetch needs a conditional as setting to true triggers a console warning for redundancy.
*/

export type LinkProps = {
  asNewTab?: boolean;
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  isExternal?: boolean;
  isSponsored?: boolean;
  noFollow?: boolean;
  prefetch?: boolean;
  rel?: string;
  replace?: boolean;
  scroll?: boolean;
  to: string;
};

export const Link = ({
  asNewTab,
  children,
  className,
  isDisabled = false,
  isExternal,
  prefetch,
  replace,
  scroll = true,
  to,
  rel,
}: LinkProps) =>
  isDisabled ? (
    <a aria-disabled className={className} role='link'>
      {children}
    </a>
  ) : (
    <NextLink
      href={to}
      {...(!prefetch ? { prefetch: false } : {})}
      replace={replace}
      scroll={scroll}>
      {/* NOTE: isExternal can be swapped out at some point. This is a fallback catch. */}
      <a className={className} rel={rel} target={asNewTab || isExternal ? '_blank' : undefined}>
        {children}
      </a>
    </NextLink>
  );
