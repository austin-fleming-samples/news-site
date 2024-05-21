import { getImage } from '@cms/images/urlFor';
import { Author as AuthorProps } from '@cms/types/sanityTypes';
import { Container, SectionContainer } from '@components/layout';
import { AspectImage, SocialsList, Typography } from '@components/ui';
import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  AuthorImageWrapper,
  AuthorLinkContainer,
  ImagePane,
  TextContainer,
} from './PostFooter.Styled';

export const PostFooter = ({ author }: { author: AuthorProps }) => (
  <SectionContainer>
    <Container>
      <NextLink href={`/author/${author.slug.current}`} passHref>
        <AuthorLinkContainer>
          {author.mainimage && (
            <ImagePane>
              <AuthorImageWrapper>
                <NextImage
                  priority
                  alt={author.mainimage.alt || 'author image'}
                  blurDataURL='/placeholder-image.jpg'
                  layout='fill'
                  placeholder='blur'
                  src={getImage(author.mainimage).width(200).height(200).url()}
                />
              </AuthorImageWrapper>
            </ImagePane>
          )}
          <TextContainer>
            {author.title && (
              <Typography tag='h1' variant='h4'>
                {author.title}
              </Typography>
            )}
            {author.subtitle && (
              <Typography tag='h2' variant='caption'>
                {author.subtitle}
              </Typography>
            )}
            {author.summary && (
              <Typography tag='p' variant='body2'>
                {author.summary}
              </Typography>
            )}
            {/*
              HACK: Turn back on
              {personal_site && <p>{personal_site}</p>}
              {email && <p>{email}</p>}
              {social_links?.links && <SocialsList useIcons socials={social_links} />}
            */}
          </TextContainer>
        </AuthorLinkContainer>
      </NextLink>
    </Container>
  </SectionContainer>
);
