import { PaletteOptions } from '@mui/material';

import { COLOR, ThemeMode } from '@/constant';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  background: {
    default: COLOR.white,
    paper: COLOR.black,
  },
  text: {
    primary: COLOR.black,
    disabled: COLOR.blackAlpha(0.8),
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  background: {
    default: COLOR.black,
    paper: COLOR.whiteAlpha(0.05),
  },
  text: {
    primary: COLOR.white,
    disabled: COLOR.whiteAlpha(0.8),
  },
};

export const getPalette = (mode: ThemeMode) => (mode === 'light' ? lightPalette : darkPalette);
