import { styled } from '@mui/material';

export const Container = styled('div')({
  position: 'relative',
  width: '8.25rem',
  paddingTop: '2.125rem',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});
