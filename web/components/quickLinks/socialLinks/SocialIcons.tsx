import { Socials } from '@cms/types/codegen';

const FacebookIcon = () => <p>FB</p>;
const InstagramIcon = () => <p>IG</p>;
const LinkedInIcon = () => <p>LN</p>;
const MediumIcon = () => <p>MD</p>;
const TwitterIcon = () => <p>TW</p>;
const YoutubeIcon = () => <p>YT</p>;

type SocialLinkType = Socials['links'][number]['title'];

const socialIconsSelector = (type: SocialLinkType) =>
  ({
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    linkedin: <LinkedInIcon />,
    medium: <MediumIcon />,
    twitter: <TwitterIcon />,
    youtube: <YoutubeIcon />,
  }[`${type}`]);

interface SocialIconsProps {
  type: SocialLinkType;
}

export const SocialIcons = ({ type }: SocialIconsProps) => socialIconsSelector(type);
