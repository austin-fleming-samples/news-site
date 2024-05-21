import { Container } from '@components/layout';
import { useBreakingRail } from '@components/providers';
import { PolyButton } from '@components/ui';
import { breakingRail } from '@config/preval';
import S from './BreakingRail.module.css';

export const BreakingRail = () => {
  const { toggleRail } = useBreakingRail();

  if (!breakingRail) {
    console.error('Error in "BreakingRail" component. Failed to get "breakingRail" from preval.');
    return null;
  }

  return (
    <aside className={S.root}>
      <Container className={S.contentContainer} el='article'>
        {breakingRail && (
          <PolyButton
            as='link'
            className={`${S.message}`}
            size='sm'
            to={`/${breakingRail._type}/${breakingRail.slug.current}`}>
            <span className={S.breakingLabel}>Breaking:</span> {breakingRail.title}
          </PolyButton>
        )}
        <PolyButton
          aria-label='close notification'
          as='button'
          size='sm'
          variant='text'
          onClick={() => toggleRail()}>
          close
        </PolyButton>
      </Container>
    </aside>
  );
};
