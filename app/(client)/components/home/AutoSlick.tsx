'use client';

import { useMemo, useRef } from 'react';
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import * as S from './AutoSlick.styles';

import { SmartImage, StaticImport } from '@/(client)/components';

const SLIDER_SETTINGS: Settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 4000,
  autoplaySpeed: 4000,
  cssEase: 'linear',
};

type SlickItemProps = {
  title: string;
  description: string;
  image: string | StaticImport;
};

type AutoSlickProps = {
  slickItems: SlickItemProps[];
} & Settings;

export const AutoSlick: React.FC<AutoSlickProps> = ({ slickItems, ...props }) => {
  const sliderRef = useRef<Slider>(null);

  const sliderSettings = useMemo(() => ({ ...SLIDER_SETTINGS, ...props }), [props]);

  return (
    <S.Container>
      <Slider ref={sliderRef} {...sliderSettings}>
        {slickItems.map(({ title, description, image }, index) => (
          <S.SlickCardContainer key={index}>
            <S.SlickCard>
              <S.SlickContent>
                <h3>{title}</h3>
                <h5>{description}</h5>
              </S.SlickContent>
              <SmartImage alt={`auto-slick-${image.toString()}`} src={image} />
            </S.SlickCard>
          </S.SlickCardContainer>
        ))}
      </Slider>
    </S.Container>
  );
};
