import type { ReactNode } from 'react';
import type { TagOptionProps, VariantOptionProps } from './types';
import { StyledTypography } from './Typography.styled';

type TypographyProps = {
  center?: boolean;
  children: ReactNode;
  className?: string;
  strikeThrough?: boolean;
  tag: TagOptionProps;
  variant: VariantOptionProps;
};

export const Typography = ({
  children,
  variant,
  tag,
  className,
  center = false,
  strikeThrough = false,
}: TypographyProps) => (
  <StyledTypography
    as={tag}
    center={center}
    className={className}
    strikeThrough={strikeThrough}
    variant={variant}>
    {children}
  </StyledTypography>
);
