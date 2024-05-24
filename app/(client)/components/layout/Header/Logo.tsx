'use client';

import { useRouter } from 'next/navigation';

import * as S from './Logo.styles';

import { SmartImage } from '@/(client)/components';
import { useThemeModeStore } from '@/(client)/stores';

import { ROUTE_URL } from '@/constant';

import logoBlack from '#/images/logoBlack.png';
import logoWhite from '#/images/logoWhite.png';

export const Logo: React.FC = () => {
  const router = useRouter();
  const { themeMode } = useThemeModeStore(selector => selector);

  const onLogoClick = () => {
    router.push(ROUTE_URL.home);
  };

  return (
    <S.Container className='clickable' onClick={onLogoClick}>
      <SmartImage alt='logo' src={themeMode === 'light' ? logoWhite : logoBlack} />
    </S.Container>
  );
};
