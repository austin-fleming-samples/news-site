import NextLink from 'next/link';
import { StyledLink, StyledSectionHeading, StyledTitle } from './SectionHeading.styled';

export const SectionHeading = ({
  title,
  link,
  linkLabel,
}: {
  link?: string;
  linkLabel?: string;
  title: string;
}) => (
  <StyledSectionHeading>
    <StyledTitle as='h1'>{title}</StyledTitle>
    {link && (
      <NextLink passHref href={link}>
        <StyledLink target={link && link.slice(0, 4) === 'http' ? '_blank' : '_self'}>
          {linkLabel || 'view all'}
        </StyledLink>
      </NextLink>
    )}
  </StyledSectionHeading>
);
