'use client';

import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { SnackbarProvider } from 'notistack';

import { DefaultNotistack, ErrorNotistack } from './notistacks';

import { TIME_FORMAT } from '@/constants';
import { theme } from '@/themes';

type ProviderProps = {
  children: React.ReactNode;
};

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          Components={{ default: DefaultNotistack, error: ErrorNotistack }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={TIME_FORMAT.seconds(1.5)}>
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
