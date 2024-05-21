import type { ReactNode } from 'react';

export const SimpleLink = ({ href, children }: { children: ReactNode; href: string }) => {
  const isExternal = href?.startsWith('http');

  return isExternal ? (
    <a href={href} rel='noreferrer nofollow noopener' target='_blank'>
      {children}
    </a>
  ) : (
    <a href={href}>{children}</a>
  );
};
