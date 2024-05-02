'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { CustomQueryClientProvider } from './CustomQueryClientProvider';
import { CustomSnackbarProvider } from './CustomSnackbarProvider';
import { CustomThemeProvider } from './CustomThemeProvider';

type ProviderProps = {
  children: React.ReactNode;
};

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <CustomQueryClientProvider>
        <CustomThemeProvider>
          <CustomSnackbarProvider>{children}</CustomSnackbarProvider>
        </CustomThemeProvider>
      </CustomQueryClientProvider>
    </AppRouterCacheProvider>
  );
};
