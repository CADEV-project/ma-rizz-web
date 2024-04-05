import { Button, Modal, styled } from '@mui/material';

import { COLOR } from '@/constant';

export const ModalContainer = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export const ModalContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  width: '40rem',
  padding: '1.25rem',
  boxSizing: 'border-box',
  backgroundColor: COLOR.black,
  borderRadius: '.5rem',
  border: `.125rem solid ${COLOR.whiteAlpha(0.2)}`,
});

export const OriginalImageWrapper = styled('div')<{ width: number; height: number }>(
  ({ width, height }) => ({
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: '.5rem',
    backgroundColor: COLOR.whiteAlpha(0.1),
  })
);

export const ImageCropModalButtonContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const PreviewButton = styled(Button)({
  width: '49%',
  backgroundColor: COLOR.white,
  color: COLOR.black,
  fontWeight: 700,
  '&:hover': {
    backgroundColor: COLOR.whiteAlpha(0.2),
  },
});

export const ApplyButton = styled(Button)({
  width: '49%',
  backgroundColor: COLOR.button,
  color: COLOR.white,
  fontWeight: 700,
  '&:hover': {
    backgroundColor: COLOR.buttonHover,
  },
});

export const InvisibleCanvas = styled('canvas')({
  width: '0',
  height: '0',
});
