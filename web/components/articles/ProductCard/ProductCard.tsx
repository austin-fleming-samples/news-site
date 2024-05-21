import type { Products as ProductsProps } from '@cms/types/sanityTypes';
import { DetailedCard } from '@components/ui';

export const ProductCard = ({
  title,
  priority,
  storeLink,
  price,
  discountedFromPrice,
  datePublished,
  productSeries,
  mainimage,
  summary,
}: ProductsProps) => (
  <DetailedCard
    image={mainimage}
    link={storeLink}
    originalPrice={discountedFromPrice}
    overline={productSeries}
    price={price}
    summary={summary}
    title={title}
  />
);
