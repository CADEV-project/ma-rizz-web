'use client';

import { useMemo } from 'react';

import { ThemeProvider, createTheme } from '@mui/material';

import { useThemeModeStore } from '@/(client)/stores';
import { breakpoints, getComponents, getTypography } from '@/(client)/themes';

import { getPalette } from '@/(client)/themes/palettes';

import { ThemeMode } from '@/constant';

type CustomThemeProviderProps = {
  themeMode: ThemeMode;
  children: React.ReactNode;
};

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  const { themeMode } = useThemeModeStore(selector => selector);

  const palette = useMemo(() => getPalette(themeMode), [themeMode]);

  const components = useMemo(() => getComponents(breakpoints, palette), [palette]);

  const typography = useMemo(() => getTypography(breakpoints, palette), [palette]);

  const theme = useMemo(
    () => createTheme({ breakpoints, palette, components, typography }),
    [components, palette, typography]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
