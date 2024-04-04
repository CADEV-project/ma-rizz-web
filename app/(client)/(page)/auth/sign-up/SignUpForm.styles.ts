import Link from 'next/link';

import { Button, styled } from '@mui/material';

import { COLOR } from '@/constant';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '40rem',
  padding: '25rem 0 5rem',
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

export const EmailFormContainer = styled('div')({
  display: 'flex',
  gap: '1rem',
  width: '100%',
});

export const EmailInputContainer = styled('div')({
  width: '80%',
});

export const DuplicateCheckButton = styled(Button)({
  width: 'calc(20% - 1rem)',
  backgroundColor: COLOR.button,
  color: COLOR.white,
  fontWeight: 700,
  '&:hover': {
    backgroundColor: COLOR.buttonHover,
  },
});

export const PhoneNumberFormContainer = styled('div')({
  display: 'flex',
  gap: '1rem',
  width: '100%',
});

export const PhoneNumberInputContainer = styled('div')({
  width: '80%',
});

export const SendVerificationCodeButton = styled(Button)({
  width: 'calc(20% - 1rem)',
  backgroundColor: COLOR.button,
  color: COLOR.white,
  fontWeight: 700,
  '&:hover': {
    backgroundColor: COLOR.buttonHover,
  },
});

export const VerificationCodeFormContainer = styled('div')({
  position: 'relative',
  width: '100%',
});

export const VerificationCodeInputContainer = styled('div')({
  width: '100%',
});

export const VerificationTimerContainer = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '20%',
  height: '100%',
  paddingRight: '1rem',
  color: COLOR.error,
});

export const AddressFormContainer = styled('div')({
  display: 'flex',
  gap: '1rem',
  width: '100%',
});

export const AddressInputContainer = styled('div')({
  width: '80%',
});

export const AddressSearchButton = styled(Button)({
  width: 'calc(20% - 1rem)',
  backgroundColor: COLOR.button,
  color: COLOR.white,
  fontWeight: 700,
  '&:hover': {
    backgroundColor: COLOR.buttonHover,
  },
});

export const SignUpButton = styled(Button)({
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

export const GoToSignInPageButton = styled(Link)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '3.75rem',
  backgroundColor: COLOR.themePurple,
  borderRadius: '.25rem',
  color: COLOR.white,
  textDecoration: 'none',
  fontSize: '.875rem',
  fontWeight: 700,
  '&:hover': {
    backgroundColor: COLOR.themePink,
  },
});

export const DaumAddressSearchOverlay = styled('div')({
  display: 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: COLOR.blackAlpha(0.5),
  zIndex: 999,
});

export const DaumAddressSearchWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '37.5rem',
  padding: '1rem',
  boxSizing: 'border-box',
  backgroundColor: COLOR.white,
});

export const DaumAddressSearchContainer = styled('div')({
  width: '100%',
});
