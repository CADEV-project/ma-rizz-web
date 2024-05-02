import { Button, styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  width: '25rem',
  height: '25rem',
  backgroundColor: theme.palette.background.default,
}));

export const ActButton = styled(Button)({
  width: '12.5rem',
  height: '3.75rem',
});
