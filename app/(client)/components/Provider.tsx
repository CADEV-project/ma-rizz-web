'use client';

import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { SnackbarProvider } from 'notistack';

import { DefaultNotistack, ErrorNotistack } from './notistacks';

import { theme } from '@/(client)/themes';

import { TIME_FORMAT } from '@/constants';

type ProviderProps = {
  children: React.ReactNode;
};

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={3}
            Components={{ default: DefaultNotistack, error: ErrorNotistack }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={TIME_FORMAT.seconds(1.5)}>
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </SessionProvider>
    </AppRouterCacheProvider>
  );
};
