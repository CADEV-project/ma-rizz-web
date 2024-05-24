import { styled } from '@mui/material';

export const Container = styled('div')({
  width: '100%',
});

export const SlickCardContainer = styled('div')({
  width: '100%',
  padding: '1.5rem 1rem',
  boxSizing: 'border-box',
});

export const SlickCard = styled('div')({
  position: 'relative',
  width: '100%',
  paddingTop: '56.25%',
  borderRadius: '.25rem',
  overflow: 'hidden',
});

export const SlickContent = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});
