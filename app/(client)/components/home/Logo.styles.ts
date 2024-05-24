import { styled } from '@mui/material';

import { COLOR } from '@/constant';

export const Container = styled('div')({
  position: 'relative',
  width: '30rem',
  paddingTop: '11.25rem',
  overflow: 'hidden',
});

export const AnimationBlind = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'skew(-30deg) translateX(40rem)',
  backgroundColor: COLOR.whiteAlpha(0.25),
  backdropFilter: 'blur(.125rem)',
  WebkitBackdropFilter: 'blur(.125rem)',
  width: '5rem',
  height: '11.25rem',
  animation: 'blind 8s infinite',
  animationFillMode: 'forwards',
  '@keyframes blind': {
    '0%': {
      transform: 'skew(-30deg) translateX(40rem)',
    },
    '25%': {
      transform: 'skew(-30deg) translateX(10rem)',
    },
    '50%': {
      transform: 'skew(-30deg) translateX(30rem)',
    },
    '75%': {
      transform: 'skew(-30deg) translateX(-10rem)',
    },
    '100%': {
      transform: 'skew(-30deg) translateX(37.5rem)',
    },
  },
});
