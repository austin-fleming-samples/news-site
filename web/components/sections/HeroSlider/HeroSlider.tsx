import { useState, MouseEvent } from 'react';
import { getImage } from '@cms/images/urlFor';
import type { Videoposts as VideopostsProps } from '@cms/types/sanityTypes';
import { BreakingTag } from '@components/ui';
import { cloin } from '@lib/cloin';
import { useKeenSlider } from 'keen-slider/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import S from './HeroSlider.module.css';
import { Slide, SlideLinkWrapper, StyledSummary, StyledTitle, TextBox } from './HeroSlider.styled';
import 'keen-slider/keen-slider.min.css';

type ArrowProps = {
  isDisabled?: boolean;
  left?: boolean;
  onClick: (evt: MouseEvent) => void;
};
const Arrow = ({ isDisabled = false, left = false, onClick }: ArrowProps) => (
  <button
    aria-disabled={isDisabled}
    aria-label={`Go to ${left ? 'previous' : 'next'} slide`}
    className={cloin(
      S.arrowButton,
      left && S['arrowButton--left'],
      isDisabled && S['arrowButton--disabled'],
    )}
    disabled={isDisabled}
    type='button'
    onClick={onClick}>
    <svg className={S.arrowButton__icon} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      {left && (
        <path
          d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z'
          fill='currentColor'
        />
      )}
      {!left && <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' fill='currentColor' />}
    </svg>
  </button>
);

// TODO: add slider buttons
// TODO: appear buttons have broken
// TODO: [future] set min aspect ratio
// TODO: [ADA] currently tabbing through behaves funny. Refactor to perform better with tabbing.
type HeroSliderProps = {
  videoposts: VideopostsProps[];
};

export const HeroSlider = ({ videoposts }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    created: () => {
      setLoaded(true);
    },
    initial: 0,
    slideChanged: (slider) => {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <>
      <div ref={sliderRef} className='keen-slider'>
        {videoposts.map((post, idx) => (
          <Slide
            key={post._id}
            as='article'
            className={`keen-slider__slide number-slide${idx + 1}`}
            isBreaking={!!post.isBreaking || !!post.isBreakingDropdown}>
            <NextLink passHref href={`/${post._type}/${post.slug.current}`}>
              <SlideLinkWrapper>
                {post.mainimage && (
                  <NextImage
                    alt={post.mainimage.alt || 'article image'}
                    blurDataURL='/placeholder-image.jpg'
                    layout='fill'
                    objectFit='cover'
                    placeholder='blur'
                    priority={idx === 0}
                    src={getImage(post.mainimage).width(1000).height(1000).url()}
                  />
                )}
                <TextBox>
                  {(post.isBreaking || post.isBreakingDropdown) && <BreakingTag />}
                  <StyledTitle>{post.title}</StyledTitle>
                  {post.summary && <StyledSummary>{post.summary}</StyledSummary>}
                </TextBox>
              </SlideLinkWrapper>
            </NextLink>
          </Slide>
        ))}

        {loaded && instanceRef.current && (
          <>
            {currentSlide !== 0 && (
              <Arrow
                left
                onClick={(evt: MouseEvent) => {
                  evt.stopPropagation();
                  instanceRef.current?.prev();
                }}
              />
            )}
            {currentSlide !== instanceRef.current.track.details.slides.length - 1 && (
              <Arrow
                onClick={(evt: MouseEvent) => {
                  evt.stopPropagation();
                  instanceRef.current?.next();
                }}
              />
            )}
          </>
        )}
        {loaded && instanceRef.current && (
          <div className={S.dotNav}>
            {instanceRef.current.track.details.slides.map(({ abs, distance }, idx) => {
              const isCurrent = currentSlide === idx;

              return (
                <button
                  key={`${abs}_${distance}`}
                  aria-label={`Jump to slide ${idx + 1}`}
                  className={cloin(S.dot, isCurrent && S.dot__active)}
                  type='button'
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
