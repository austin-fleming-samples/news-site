import { PostBody } from '@components/sections';
import type { ArticleText as ArticleTextProps } from '@cms/types/sanityTypes';

/*
Provides an simplified interface for 'PostBody' that can be used in 'RenderSections'.
*/
export const ArticleText = ({ body }: ArticleTextProps) => <PostBody blockContent={body} />;
