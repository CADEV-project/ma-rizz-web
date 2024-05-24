'use client';

import * as S from './Logo.styles';

import { SmartImage } from '@/(client)/components';
import { useThemeModeStore } from '@/(client)/stores';

import logoBlackBig from '#/images/logoBlackBig.png';
import logoWhiteBig from '#/images/logoWhiteBig.png';

export const Logo: React.FC = () => {
  const { themeMode } = useThemeModeStore(selector => selector);

  return (
    <S.Container>
      <SmartImage alt='home-logo-big' src={themeMode === 'light' ? logoWhiteBig : logoBlackBig} />
      <S.AnimationBlind />
    </S.Container>
  );
};
