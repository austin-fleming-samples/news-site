import { Container } from '@components/layout';
import { AspectImage, getDestination, SocialLink, Typography } from '@components/ui';
import { footerSettings } from '@config/preval';
import {
  ItemList,
  PageList,
  StyledCta,
  StyledCtaLink,
  StyledFooter,
  StyledFooterLinks,
  StyledPageLink,
  StyledPageLinkTitle,
  StyledSection,
} from './Footer.styled';

// HACK: GetDestination

export const Footer = () => {
  const { footerLogo, footerCta, footerNavigation, socialMedia, policies, copyrightNotice } =
    footerSettings;

  return (
    <StyledFooter>
      <AspectImage fillContainer image={footerLogo} />

      <Container center>
        {/* CTA */}
        {footerCta && (
          <StyledSection key='footerCta'>
            <StyledCta>
              {footerCta?.ctaLink && (
                <StyledCtaLink href='#footersignup'>{footerCta.ctaLink.label}</StyledCtaLink>
              )}
              {footerCta?.ctaText && (
                <Typography key='ctatext' center tag='p' variant='body1'>
                  {footerCta.ctaText}
                </Typography>
              )}
            </StyledCta>
          </StyledSection>
        )}

        {/* PAGE LINKS */}
        <StyledSection key='footerLinks'>
          <StyledFooterLinks>
            {footerNavigation && (
              <PageList key='page'>
                <StyledPageLinkTitle>Pages</StyledPageLinkTitle>
                <ItemList center vertical>
                  {footerNavigation.map((navLink) => (
                    /* ESNOTE: [future] cleanup how links are handled. */
                    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                    /* @ts-ignore */
                    <StyledPageLink key={navLink.label} href={getDestination(navLink.destination)}>
                      {navLink.label}
                    </StyledPageLink>
                  ))}
                </ItemList>
              </PageList>
            )}
            {socialMedia?.links && (
              <PageList key='socials'>
                <StyledPageLinkTitle>Socials</StyledPageLinkTitle>
                <ItemList center vertical>
                  {socialMedia.links.map((socialLink) => (
                    <SocialLink key={socialLink._key} data={socialLink} />
                  ))}
                </ItemList>
              </PageList>
            )}
          </StyledFooterLinks>
        </StyledSection>

        {/* LEGALS */}
        <StyledSection key='legals'>
          {copyrightNotice && (
            <Typography tag='p' variant='caption'>
              {copyrightNotice}
            </Typography>
          )}
          {policies && (
            <PageList key='policies'>
              <ItemList center>
                {policies.map((policy) => (
                  /* ESNOTE: [future] cleanup how links are handled. */
                  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                  /* @ts-ignore */
                  <StyledPageLink key={policy.label} pad href={getDestination(policy.destination)}>
                    {policy.label}
                  </StyledPageLink>
                ))}
              </ItemList>
            </PageList>
          )}
        </StyledSection>
      </Container>
    </StyledFooter>
  );
};
