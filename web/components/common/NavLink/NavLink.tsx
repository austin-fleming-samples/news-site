import type { Link as LinkProps } from '@cms/types/sanityTypes';
import { getDestination } from '@components/ui';
import NextLink from 'next/link';
import { StyledNavLink } from './NavLink.Styled';

// HACK: should use 'button'
// Whole component shouldn't exist
type NavLinkProps = {
  fillContainer?: boolean;
  link: LinkProps;
};

export const NavLink = ({ link, fillContainer = false }: NavLinkProps) => {
  // TODO: [future] links should be handled differently and centrally. Currently, this is a work around.
  // HACK:
  const isExternal = !!link.destination.externalLink;

  return (
    <NextLink passHref href={getDestination(link.destination) || '/'}>
      <StyledNavLink fillContainer={fillContainer} target={isExternal ? '_blank' : '_self'}>
        {link.label}
      </StyledNavLink>
    </NextLink>
  );
};
