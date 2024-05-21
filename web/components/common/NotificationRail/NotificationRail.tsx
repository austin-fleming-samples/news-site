import { Container } from '@components/layout';
import { useNotificationRail } from '@components/providers';
import { getDestination, PolyButton } from '@components/ui';
import { notificationRail as railContent } from '@config/preval';
import S from './NotificationRail.module.css';

export const NotificationRail = () => {
  const { toggleRail } = useNotificationRail();

  /* TODO: [future] links should be handled differently and centrally. */
  /* HACK: */
  const maybeRailDestination = railContent.content.destination;

  /* ESNOTE: [future] cleanup how links are handled. */
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  /* @ts-ignore */
  const maybeRailHref = getDestination(maybeRailDestination) || '#';
  // TODO: [future] this and above should be combined and centralized.
  const isExternal = maybeRailHref.startsWith('http');

  return (
    <aside className={S.root}>
      <Container className={S.contentContainer}>
        {/* TODO: apply trim to content */}
        {/* TODO: better handle what happens if rail isn't a link */}
        <PolyButton
          as={maybeRailHref ? 'link' : 'pseudo'}
          className={S.message}
          color='inverted'
          isExternal={isExternal}
          size='sm'
          to={maybeRailHref}
          variant='text'>
          {railContent.content.label}
        </PolyButton>
        <PolyButton
          aria-label='close notification'
          as='button'
          color='inverted'
          size='sm'
          variant='text'
          onClick={() => toggleRail()}>
          close
        </PolyButton>
      </Container>
    </aside>
  );
};
