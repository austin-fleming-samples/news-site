/* import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMediumSquare,
  AiFillTwitterSquare,
  AiFillYoutube,
} from 'react-icons/ai'; */
import { Socials as SocialsProps } from '@cms/types/sanityTypes';
import { ItemList } from '@components/ui';

export const SocialsList = ({
  socials,
  useIcons = false,
  vertical = false,
  center = false,
}: {
  center?: boolean;
  socials: SocialsProps;
  useIcons?: boolean;
  vertical?: boolean;
}) => <div>socials</div>;

/*  socials?.links ? (
    <ItemList vertical={vertical} center={center}>
      {socials.links.map((socialLink) =>
        socialLink.link ? (
          useIcons ? (
            <li key={socialLink._key}>
              <a href={socialLink.link}>
                {socialLink.title === 'instagram' && <AiFillInstagram />}
                {socialLink.title === 'twitter' && <AiFillTwitterSquare />}
                {socialLink.title === 'facebook' && <AiFillFacebook />}
                {socialLink.title === 'youtube' && <AiFillYoutube />}
                {socialLink.title === 'medium' && <AiFillMediumSquare />}
                {socialLink.title === 'linkedin' && <AiFillLinkedin />}
              </a>
            </li>
          ) : (
            <li key={socialLink._key}>
              <a href={socialLink.link}>{socialLink.title}</a>
            </li>
          )
        ) : null
      )}
    </ItemList>
  ) : null; */
