'use client';

import { forwardRef } from 'react';

import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Typography } from '@mui/material';
import { SnackbarKey, SnackbarMessage } from 'notistack';

import * as S from './DefaultNotistack.styles';

type DefaultNotistackProps = {
  id: SnackbarKey;
  message: SnackbarMessage;
};

export const DefaultNotistack = forwardRef<HTMLDivElement, DefaultNotistackProps>(
  ({ id, message }, ref) => (
    <S.CustomNotistackWithInfoContainer key={`custom-notistack-with-error-${id}`} ref={ref}>
      <CircleNotificationsIcon />
      <Typography>{message}</Typography>
    </S.CustomNotistackWithInfoContainer>
  )
);

DefaultNotistack.displayName = 'DefaultNotistack';
