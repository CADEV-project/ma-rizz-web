import { Modal, styled } from '@mui/material';

import { COLOR } from '@/constant';

export const ModalContainer = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export const ModalContent = styled('div')({
  width: '40rem',
  height: '40rem',
  padding: '1.25rem',
  boxSizing: 'border-box',
  backgroundColor: COLOR.black,
  borderRadius: '0.5rem',
  border: `0.125rem solid ${COLOR.white}`,
});

export const CroppedImageWrapper = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
});
