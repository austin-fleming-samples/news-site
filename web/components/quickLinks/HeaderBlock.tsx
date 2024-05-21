import { Container } from '@components/layout';
import { Link } from '@components/ui';
import NextImage from 'next/image';

const headerImage = {
  alt: 'smarther news logo',
  height: 120,
  src: '/smarthernews_main-logo-white.svg',
  width: 900,
};

export const HeaderBlock = () => (
  <Container className='flex flex-col items-center gap-8 mt-10' width='narrow'>
    <Link
      className='mx-auto flex flex-col justify-center items-center no-underline text-background'
      to='/'>
      <div className='w-[350px] max-w-[80%]'>
        <NextImage
          alt={headerImage.alt}
          height={headerImage.height}
          src={headerImage.src}
          width={headerImage.width}
        />
      </div>
      <h1 className='font-bold uppercase text-xs md:text-sm tracking-wider no-underline pt-[0.5em] whitespace-nowrap'>
        Quick. Concise. Nonpartisan.
      </h1>
    </Link>

    <h2 className='font-bold uppercase text-base tracking-wider text-background'>@SMARTHERNEWS</h2>
  </Container>
);
