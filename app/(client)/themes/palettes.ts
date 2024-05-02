import { PaletteOptions } from '@mui/material';

import { COLOR, ThemeMode } from '@/constant';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  background: {
    default: COLOR.success,
  },
  text: {
    primary: COLOR.black,
    disabled: COLOR.blackAlpha(0.8),
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  background: {
    default: COLOR.error,
  },
  text: {
    primary: COLOR.white,
    disabled: COLOR.whiteAlpha(0.8),
  },
};

export const getPalette = (mode: ThemeMode) => (mode === 'light' ? lightPalette : darkPalette);
