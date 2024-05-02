'use client';

import { forwardRef } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import { SnackbarKey, SnackbarMessage } from 'notistack';

import * as S from './SuccessNotistack.styles';

type SuccessNotistackProps = {
  id: SnackbarKey;
  message: SnackbarMessage;
};

export const SuccessNotistack = forwardRef<HTMLDivElement, SuccessNotistackProps>(
  ({ id, message }, ref) => (
    <S.SuccessNotistackContainer key={`success-notistack-${id}`} ref={ref}>
      <S.IconWrapper>
        <CheckCircleIcon />
      </S.IconWrapper>
      <Typography fontSize='1.25rem' fontWeight='700'>
        {message}
      </Typography>
    </S.SuccessNotistackContainer>
  )
);

SuccessNotistack.displayName = 'SuccessNotistack';
