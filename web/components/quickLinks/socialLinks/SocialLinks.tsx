import { Container } from '@components/layout';
import { Link } from '@components/ui';
import { defaultSettings } from '@config/preval';
import { SocialIcons } from './SocialIcons';

const { links: socialLinks } = defaultSettings.generalSettings.socialLinks;

export const SocialLinks = () => (
  <Container className='flex flex-row flex-wrap gap-4 justify-center' width='narrow'>
    {socialLinks.map(({ title, link, _key: key }) => (
      <div key={key}>
        <Link isExternal to={link}>
          <SocialIcons type={title} />
        </Link>
      </div>
    ))}
  </Container>
);
