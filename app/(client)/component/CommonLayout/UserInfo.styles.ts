import Link from 'next/link';

import { styled } from '@mui/material';

import { COLOR } from '@/constant';

export const Container = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  textDecoration: 'none',
  color: COLOR.white,
});

export const ProfileImageContainer = styled('div')({
  position: 'relative',
  width: '2.5rem',
  height: '2.5rem',
});

export const SignInLink = styled(Link)({
  backgroundColor: COLOR.black,
  color: COLOR.white,
  fontWeight: 700,
  textDecoration: 'none',
  '&:hover': {
    color: COLOR.whiteAlpha(0.8),
  },
});
