'use client';

import { SnackbarProvider } from 'notistack';

import {
  ErrorNotistack,
  InfoNotistack,
  SuccessNotistack,
  WarningNotistack,
} from '@/(client)/components/notistack';

import { MILLISECOND_TIME_FORMAT } from '@/constant';

type CustomSnackbarProviderProps = {
  children: React.ReactNode;
};

export const CustomSnackbarProvider: React.FC<CustomSnackbarProviderProps> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      Components={{
        default: InfoNotistack,
        success: SuccessNotistack,
        error: ErrorNotistack,
        warning: WarningNotistack,
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={MILLISECOND_TIME_FORMAT.seconds(1.5)}>
      {children}
    </SnackbarProvider>
  );
};
