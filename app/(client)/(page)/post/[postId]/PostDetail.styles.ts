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

export const UpdateContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '40rem',
  boxSizing: 'border-box',
});

export const TitleContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginBottom: '1rem',
});

export const FormContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const PostUpdateButton = styled(Button)({
  width: '100%',
  height: '3.75rem',
  backgroundColor: COLOR.white,
  color: COLOR.black,
  fontWeight: 700,
  border: `1px solid ${COLOR.whiteAlpha(0.8)}`,
  marginTop: '2rem',
  '&:hover': {
    backgroundColor: COLOR.whiteAlpha(0.8),
  },
});

export const DividerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  height: '2.5rem',
});

export const Divider = styled('div')({
  width: '100%',
  height: '.0625rem',
  borderStyle: 'solid',
  borderImage: `linear-gradient(to right, ${COLOR.themePurple}, ${COLOR.themePink})`,
  borderImageSlice: 1,
  borderImageWidth: '0 0 .0625rem 0',
});

export const DividerText = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '0 .5rem',
  backgroundColor: COLOR.black,
  color: COLOR.white,
  fontSize: '1rem',
  fontWeight: 700,
  zIndex: 1,
  whiteSpace: 'nowrap',
});

export const UnableUpdateButton = styled(Button)({
  width: '100%',
  height: '3.75rem',
  backgroundColor: COLOR.button,
  color: COLOR.white,
  fontWeight: 700,
  '&:hover': {
    backgroundColor: COLOR.buttonHover,
  },
});
