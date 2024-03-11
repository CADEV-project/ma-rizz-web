'use client';

import { forwardRef } from 'react';

import ErrorIcon from '@mui/icons-material/Error';
import { Typography } from '@mui/material';
import { SnackbarKey, SnackbarMessage } from 'notistack';

import * as S from './ErrorNotistack.styles';

type ErrorNotistackProps = {
  id: SnackbarKey;
  message: SnackbarMessage;
};

export const ErrorNotistack = forwardRef<HTMLDivElement, ErrorNotistackProps>(
  ({ id, message }, ref) => (
    <S.CustomNotistackWithErrorContainer key={`custom-notistack-with-error-${id}`} ref={ref}>
      <ErrorIcon color='error' />
      <Typography>{message}</Typography>
    </S.CustomNotistackWithErrorContainer>
  )
);

ErrorNotistack.displayName = 'ErrorNotistack';
