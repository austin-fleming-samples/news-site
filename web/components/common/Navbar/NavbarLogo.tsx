/* eslint @next/next/no-img-element:"off" */
import { getImage } from '@cms/images';
import type { HeaderSingleton } from '@cms/types/sanityTypes';
import { Link } from '@components/ui';
import NextLink from 'next/link';
import styled from 'styled-components';
import S from './NavbarLogo.module.css';

// HACK: move to Next Image
const StyledImage = styled.img`
  /* height: 80%; */
  height: 100%;

  @media ${({ theme }) => theme.breakpoints.mobileLg.query} {
    /* height: 100%; */
  }
`;

const StyledLinkContainer = styled.a`
  display: block;
  height: 60%;
`;

export const NavbarLogo = ({ image }: { image: HeaderSingleton['headerLogo'] }) => {
  const src = image && getImage(image).height(80).url();

  // TODO: can this be done inside the query?
  // HACK: no sizing specified
  return src ? (
    <Link className={S.root} to={src}>
      <StyledImage alt={image.alt || 'smart her news logo'} src={src} />
    </Link>
  ) : null;
};
