'use client';

import Cookies from 'js-cookie';

import * as S from './TestComponent.styles';

import { useThemeModeStore } from '@/(client)/stores';

import { COOKIE_KEY, DATASET_KEY } from '@/constant';

export const TestComponent: React.FC = () => {
  const { themeMode, changeMode } = useThemeModeStore(selector => selector);

  const onActButtonClick = () => {
    const oppositeThemeMode = themeMode === 'light' ? 'dark' : 'light';

    const html = document.querySelector('html');

    if (!html) throw new Error('html element is not found');

    const themeModeData = html.dataset[DATASET_KEY.themeMode];

    if (!themeModeData) throw new Error('themeMode data is not found');

    const themeModeCookie = Cookies.get(COOKIE_KEY.themeMode);

    if (themeModeCookie) {
      Cookies.set(COOKIE_KEY.themeMode, oppositeThemeMode);
    }

    html.dataset[DATASET_KEY.themeMode] = oppositeThemeMode;

    changeMode(oppositeThemeMode);
  };

  return (
    <S.Container>
      <S.ActButton onClick={onActButtonClick}>테마 변경하기</S.ActButton>
    </S.Container>
  );
};
