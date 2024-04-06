import { Button, styled } from '@mui/material';

import { COLOR } from '@/constant';

export const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export const ImageTestFormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export const InvisibleFileInput = styled('input')({
  display: 'none',
});

export const ImagePreviewWrapper = styled('div')({
  position: 'relative',
  width: '37.5rem',
  height: '37.5rem',
  backgroundColor: COLOR.whiteAlpha(0.2),
});

export const ImageSelectButton = styled(Button)({
  width: '18.75rem',
  height: '3.75rem',
  backgroundColor: COLOR.button,
  color: COLOR.white,
  borderRadius: '0.5rem',
  '&:hover': {
    backgroundColor: COLOR.buttonHover,
  },
});

export const UploadButton = styled(Button)({
  width: '18.75rem',
  height: '3.75rem',
  backgroundColor: COLOR.button,
  color: COLOR.white,
  borderRadius: '0.5rem',
  '&:hover': {
    backgroundColor: COLOR.buttonHover,
  },
});
