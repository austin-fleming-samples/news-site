import { StyledPageLink } from '@components/common/Footer/Footer.styled'; // HACK
import type { Socials as SocialProps } from 'cms/types/sanityTypes';

type SocialLinkProps = SocialProps['links'][number];

export const SocialLink = ({ data }: { data: SocialLinkProps }) => {
  const linkData = data;

  return linkData ? (
    <StyledPageLink key={linkData.link} href={linkData.link} rel='noreferrer' target='_blank'>
      {linkData.title}
    </StyledPageLink>
  ) : null;
};
