import { Fragment } from 'react';
import type { QuickLinksSingleton } from '@cms/types/codegen';
import { Container } from '@components/layout';
import { ContributionWidget } from './ContributionWidget';
import { LinkWidget } from './LinkWidget';
import { NewsletterWidget } from './NewsletterWidget';

interface WidgetsProps {
  widgets: QuickLinksSingleton['widgetList'];
}

export const Widgets = ({ widgets }: WidgetsProps) => {
  if (!widgets || widgets.length === 0) return null;

  return (
    <Container className='flex flex-col items-center gap-8' el='nav' width='narrow'>
      {widgets.map((widget) => (
        <Fragment key={widget._key}>
          {widget._type === 'contributionWidget' && <ContributionWidget widget={widget} />}
          {widget._type === 'linkWidget' && <LinkWidget widget={widget} />}
          {widget._type === 'newsletterWidget' && <NewsletterWidget widget={widget} />}
        </Fragment>
      ))}
    </Container>
  );
};
