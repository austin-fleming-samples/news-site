import type { HeroSplit as HeroSplitProps } from '@cms/types/sanityTypes';
import { PostHero } from '@components/sections/PostHero';

/*
Provides an simplified interface for 'PostHero' that can be used in 'RenderSections'.
*/
export const HeroSplit = ({ mainimage, title, eyebrow, summary }: HeroSplitProps) => (
  <PostHero eyebrow={eyebrow} image={mainimage} summary={summary} title={title} />
);
