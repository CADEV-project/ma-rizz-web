'use client';

import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';

import { DefaultNotistack, ErrorNotistack } from './notistack';

import { theme } from '@/(client)/theme';

import { MILLISECOND_TIME_FORMAT } from '@/constant';

type ProviderProps = {
  children: React.ReactNode;
};

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        retryDelay: MILLISECOND_TIME_FORMAT.seconds(2),
        staleTime: MILLISECOND_TIME_FORMAT.seconds(5),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
        retryDelay: MILLISECOND_TIME_FORMAT.seconds(2),
      },
    },
  });

  return (
    <AppRouterCacheProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={3}
            Components={{ default: DefaultNotistack, error: ErrorNotistack }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={MILLISECOND_TIME_FORMAT.seconds(1.5)}>
            {children}
          </SnackbarProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
};
