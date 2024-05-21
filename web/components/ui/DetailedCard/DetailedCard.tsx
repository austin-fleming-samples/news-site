import { getImage } from '@cms/images/urlFor';
import { AspectImage, Typography } from '@components/ui';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useTheme } from 'styled-components';
import {
  PriceContainer,
  StyledCard,
  StyledCardWrapper,
  StyledImageWrapper,
  StyledInfoBox,
} from './DetailedCard.styled';

type CardProps = {
  date?: string;
  image: any; // TODO: [TS] needs typing
  isBreaking?: boolean;
  isFeatured?: boolean;
  link: string;
  originalPrice?: string;
  overline?: string;
  price?: string;
  summary?: string;
  title?: string;
};

export const DetailedCard = ({
  image,
  overline,
  date,
  title,
  summary,
  link,
  price,
  originalPrice,
  isBreaking = false,
  isFeatured = false,
}: CardProps) => {
  const theme = useTheme();

  /* const imageSizes = `
          (max-width: ${theme.breakpoints.mobileLg.width}) 100vw,
          (max-width: ${theme.breakpoints.tablet.width}) 50vw,
          (max-width: ${theme.breakpoints.desktop.width}) 33vw,
          (max-width: ${theme.breakpoints.desktopLg.width}) 25vw,
          20vw
      `; */

  return (
    <NextLink passHref href={link}>
      <StyledCardWrapper aria-label='go to article'>
        <StyledCard>
          {/* <AspectImage aspectRatio={1} image={image} sizes={imageSizes} /> */}
          <StyledImageWrapper>
            <NextImage
              priority
              alt={image.alt || 'article image'}
              blurDataURL='/placeholder-image.jpg'
              layout='fill'
              placeholder='blur'
              src={getImage(image).width(450).height(450).url()}
            />
          </StyledImageWrapper>
          {(overline || date) && (
            <StyledInfoBox>
              {overline && (
                <Typography tag='p' variant='overline'>
                  {overline}
                </Typography>
              )}
              {date && (
                <Typography tag='p' variant='overline'>
                  {date}
                </Typography>
              )}
            </StyledInfoBox>
          )}
          {title && (
            <Typography tag='h1' variant='h4'>
              {title}
            </Typography>
          )}
          {summary && (
            <Typography tag='p' variant='body1'>
              {summary}
            </Typography>
          )}
          {(price || originalPrice) && (
            <PriceContainer>
              {originalPrice && (
                <Typography strikeThrough tag='p' variant='body1'>
                  {originalPrice}
                </Typography>
              )}
              {price && (
                <Typography tag='p' variant='body1'>
                  {price}
                </Typography>
              )}
            </PriceContainer>
          )}
        </StyledCard>
      </StyledCardWrapper>
    </NextLink>
  );
};
