import { useEffect, useState } from 'react';
import { BreakingRail, NotificationRail } from '@components/common';
import { Container } from '@components/layout';
import { useBreakingRail, useNotificationRail } from '@components/providers';
import { PolyButton, Link } from '@components/ui';
import { headerSettings } from '@config/preval';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import H from './Hamburger.module.css';
import S from './Navbar.module.css';
import { SkipToMain } from './SkipToMain';

const { headerLogo, headerNavigation } = headerSettings;

export const Navbar = () => {
  const router = useRouter();
  const mobileMenuId = 'mobile-menu';
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const { isOpen: breakingRailIsOpen } = useBreakingRail();
  const { isOpen: notificationRailIsOpen } = useNotificationRail();

  useEffect(() => {
    setMobileMenuIsOpen(false);
  }, [router.asPath]);

  return (
    <header className={S.root}>
      <SkipToMain />
      {notificationRailIsOpen && <NotificationRail />}
      <div className={S.navbar}>
        <Container fullHeight noPadVertical>
          <div className={S.toolbar}>
            <div className={S.logoBlock}>
              <Link className={S.logoLink} to='/'>
                <NextImage
                  alt={headerLogo.alt}
                  className={S.logoImage}
                  layout='fill'
                  objectFit='contain'
                  src={headerLogo.src}
                />
              </Link>
              <h1 className={S.logoTagLine}>Quick. Concise. Nonpartisan.</h1>
            </div>

            <button
              aria-controls={mobileMenuId}
              aria-expanded={mobileMenuIsOpen}
              aria-haspopup='menu'
              aria-label='main menu'
              className={mobileMenuIsOpen ? `${H.root} ${H.isOpen}` : H.root}
              type='button'
              onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}>
              <svg
                className={H.hamburger}
                height='30'
                pointerEvents='none'
                viewBox='0 0 100 100'
                width='30'>
                <path
                  className={H.line01}
                  d='M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058'
                />
                <path className={H.line02} d='M 20,50 H 80' />
                <path
                  className={H.line03}
                  d='M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942'
                />
              </svg>
            </button>

            {/* <DesktopMenu {...headerSettings} /> */}
            <nav className={S.desktopNav}>
              {headerNavigation.map((navLink) => (
                <PolyButton
                  key={navLink.label}
                  as='link'
                  asNewTab={navLink.asNewTab}
                  className={S.desktopNavLink}
                  isExternal={navLink.isExternal}
                  rel={navLink.rel}
                  size='sm'
                  to={navLink.to}
                  variant='text'>
                  {navLink.label}
                </PolyButton>
              ))}
            </nav>
          </div>
        </Container>

        <nav
          className={mobileMenuIsOpen ? `${S.mobileNav} ${S.mobileNavIsOpen}` : S.mobileNav}
          id={mobileMenuId}>
          {headerNavigation.map((navLink) => (
            <PolyButton
              key={navLink.label}
              as='link'
              asNewTab={navLink.asNewTab}
              className={S.mobileNavLink}
              rel={navLink.rel}
              size='md'
              to={navLink.to}
              variant='text'>
              {navLink.label}
            </PolyButton>
          ))}
        </nav>
      </div>
      {breakingRailIsOpen && <BreakingRail />}
    </header>
  );
};
