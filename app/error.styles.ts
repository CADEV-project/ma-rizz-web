import { Button, styled } from '@mui/material';

import { COLOR } from './constant';

export const Container = styled('main')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export const ErrorContentContainer = styled('section')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1.5rem',
  width: '37.5rem',
  border: `.0625rem solid ${COLOR.white}`,
  padding: '2rem',
});

export const ErrorTitleContainer = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginBottom: '3rem',
});

export const ErrorResetButton = styled(Button)({
  width: '100%',
  height: '3.75rem',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  backgroundColor: COLOR.white,
  color: COLOR.black,
  '&:hover': {
    backgroundColor: COLOR.whiteAlpha(0.8),
  },
});
