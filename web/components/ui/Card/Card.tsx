import type { ReactNode } from 'react';
import NextLink from 'next/link';
import { StyledCard } from './Card.styled';

export const Card = ({
  link,
  children,
  isAlerted = false,
}: {
  children: ReactNode;
  isAlerted?: boolean;
  link: string;
}) => (
  <NextLink passHref href={link}>
    <StyledCard isAlerted={isAlerted}>{children}</StyledCard>
  </NextLink>
);
