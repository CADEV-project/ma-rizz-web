import { Button, styled } from '@mui/material';

import { COLOR } from '@/constant';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

export const Title = styled('h1')({
  fontSize: '1.5rem',
  fontWeight: '700',
});

export const Content = styled('h3')({
  fontSize: '1rem',
  fontWeight: '400',
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '1.5rem',
  width: '100%',
});

export const GoToPostListButton = styled(Button)({
  color: COLOR.white,
  backgroundColor: COLOR.button,
  padding: '0.5rem 1rem',
  boxSizing: 'border-box',
  borderRadius: '0.25rem',
  '&:hover': {
    backgroundColor: COLOR.buttonHover,
  },
});

export const UpdateButton = styled(Button)({
  color: COLOR.black,
  backgroundColor: COLOR.white,
  padding: '0.5rem 1rem',
  boxSizing: 'border-box',
  borderRadius: '0.25rem',
  '&:hover': {
    backgroundColor: COLOR.blackAlpha(0.1),
  },
});

export const DeleteButton = styled(Button)({
  color: COLOR.white,
  backgroundColor: COLOR.error,
  padding: '0.5rem 1rem',
  boxSizing: 'border-box',
  borderRadius: '0.25rem',
  '&:hover': {
    backgroundColor: COLOR.errorHover,
  },
});
