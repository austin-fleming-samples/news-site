import type { LinkWidget as LinkWidgetCodegen } from '@cms/types/codegen';
import NextLink from 'next/link';
import { WidgetWrapper } from './WidgetWrapper';

interface LinkWidgetProps {
  widget: LinkWidgetCodegen;
}

export const LinkWidget = ({ widget }: LinkWidgetProps) => (
  <WidgetWrapper color={widget.widgetStyles.color}>
    <NextLink href={widget.to}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className='no-underline text-primary hover:text-primary font-primary text-lg font-bold w-full h-full flex flex-row flex-nowrap justify-center items-center'
        rel='noopener noreferrer'
        target='_blank'>
        {widget.label}
      </a>
    </NextLink>
  </WidgetWrapper>
);
