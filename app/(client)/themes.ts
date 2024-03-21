import { createTheme } from '@mui/material';

import { combinedFontFamily } from './utils';

import { COLOR } from '@/constants';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          fontFamily: combinedFontFamily,
          fontSize: '1rem',
          fontWeight: '400',
          fontSynthesis: 'none',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          WebkitTextSizeAdjust: '100%',
        },
        html: {
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          color: COLOR.white,
          backgroundColor: COLOR.black,
        },
        body: {
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          color: COLOR.white,
          backgroundColor: COLOR.black,
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        '.invisible-scrollbar': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.clickable': {
          cursor: 'pointer',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100% !important',
          padding: '0 !important',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          fontFamily: `${combinedFontFamily} !important`,
          form: {
            width: '100%',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  typography: {
    fontFamily: combinedFontFamily,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2rem',
      fontWeight: '400',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: '400',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: '400',
    },
    h4: {
      fontSize: '1rem',
      fontWeight: '400',
    },
    h5: {
      fontSize: '.875rem',
      fontWeight: '400',
    },
    h6: {
      fontSize: '.75rem',
      fontWeight: '400',
    },
  },
});
