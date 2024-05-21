import { getImage } from '@cms/images/urlFor';
import type { Tags as TagsProps } from '@cms/types/sanityTypes';
import { Container } from '@components/layout';
import { AspectImage, Button, Typography } from '@components/ui';
import NextImage from 'next/image';
import NextLink from 'next/link';
import styled, { useTheme } from 'styled-components';
import {
  DateBlock,
  DateGroup,
  DateTitle,
  ImagePane,
  SplitPane,
  StyledHero,
  TagBlock,
  TagGroup,
  TextPane,
  TitleGroup,
} from './PostHero.Styled';

export const PostHero = ({
  image,
  eyebrow,
  title,
  caption,
  summary,
  publishDate,
  modifiedDate,
  tagList,
}: {
  caption?: string;
  eyebrow?: string;
  image?: any; // TODO: [TS] needs typing
  modifiedDate?: string;
  publishDate?: string;
  summary?: string;
  tagList?: TagsProps;
  title?: string;
}) => (
  <StyledHero>
    <Container fullHeight>
      <SplitPane>
        {image && (
          <ImagePane>
            <NextImage
              priority
              alt={image.alt || 'article image'}
              blurDataURL='/placeholder-image.jpg'
              layout='fill'
              objectFit='cover'
              placeholder='blur'
              src={getImage(image).width(840).height(840).url()}
            />
          </ImagePane>
        )}
        <TextPane isFullwidth={!image}>
          <TitleGroup>
            {eyebrow && (
              <Typography tag='h2' variant='caption'>
                {eyebrow}
              </Typography>
            )}
            {title && (
              <Typography tag='h1' variant='h2'>
                {title}
              </Typography>
            )}
            {caption && (
              <Typography tag='p' variant='caption'>
                {caption}
              </Typography>
            )}
            {summary && <p>{summary}</p>}
          </TitleGroup>
          {(publishDate || modifiedDate) && (
            <DateGroup>
              {publishDate && (
                <DateBlock>
                  <DateTitle>Published on</DateTitle>
                  <Typography tag='p' variant='caption'>
                    {publishDate}
                  </Typography>
                </DateBlock>
              )}
              {modifiedDate && (
                <DateBlock>
                  <DateTitle>Modified on</DateTitle>
                  <Typography tag='p' variant='caption'>
                    {modifiedDate}
                  </Typography>
                </DateBlock>
              )}
            </DateGroup>
          )}
          {tagList && tagList.length > 0 && (
            <TagGroup>
              {tagList.map((tag) => (
                <TagBlock key={tag.value}>{tag.value}</TagBlock>
              ))}
            </TagGroup>
          )}
        </TextPane>
      </SplitPane>
    </Container>
  </StyledHero>
);
