'use client';

import { ThemeProvider } from '@mui/material';

import { theme } from '@/(client)/themes';

type CustomThemeProviderProps = {
  children: React.ReactNode;
};

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
