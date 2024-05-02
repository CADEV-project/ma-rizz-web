'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { CustomQueryClientProvider } from './CustomQueryClientProvider';
import { CustomSnackbarProvider } from './CustomSnackbarProvider';
import { CustomThemeProvider } from './CustomThemeProvider';
import { StoreProvider } from './StoreProvider';

import { ThemeMode } from '@/constant';

type ProviderProps = {
  themeMode: ThemeMode;
  children: React.ReactNode;
};

export const Provider: React.FC<ProviderProps> = ({ themeMode, children }) => {
  return (
    <AppRouterCacheProvider>
      <CustomQueryClientProvider>
        <StoreProvider themeMode={themeMode}>
          <CustomThemeProvider themeMode={themeMode}>
            <CustomSnackbarProvider>{children}</CustomSnackbarProvider>
          </CustomThemeProvider>
        </StoreProvider>
      </CustomQueryClientProvider>
    </AppRouterCacheProvider>
  );
};
