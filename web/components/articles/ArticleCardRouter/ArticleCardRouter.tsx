import type { PageTypes } from '@cms/types/sanityTypes';
import { ProductCard, QuickQuoteCard, QuickreadCard, VideopostCard } from '@components/articles';

export const ArticleCardRouter = ({ page }: { page: PageTypes }) => (
  <>
    {page._type === 'quickreads' && <QuickreadCard content={page} />}
    {page._type === 'quickquotes' && <QuickQuoteCard {...page} />}
    {page._type === 'videoposts' && <VideopostCard {...page} />}
    {page._type === 'products' && <ProductCard {...page} />}
    {/*
    {page._type === 'page' && <p>page</p>}
    {page._type === 'author' && <p>author</p>}
    // TODO: add in for search
    */}
  </>
);
