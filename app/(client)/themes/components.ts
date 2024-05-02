import { Typography } from '@mui/material/styles/createTypography';

import { combinedFontFamily } from '@/(client)/utils';

import { COLOR } from '@/constant';

import type {
  Components as BaseComponents,
  Mixins,
  Palette,
  Shadows,
  Theme,
  Transitions,
  ZIndex,
  BreakpointsOptions,
  PaletteOptions,
} from '@mui/material';

interface BaseTheme extends Theme {
  mixins: Mixins;
  palette: Palette;
  shadows: Shadows;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
}

export const getComponents = (
  breakpoints: BreakpointsOptions,
  palette: PaletteOptions
): BaseComponents<BaseTheme> => ({
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
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      },
      body: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
        overflowY: 'auto',
        color: COLOR.white,
        backgroundColor: COLOR.black,
        // [breakpoints.down('lg')]: {
        //   position: 'fixed',
        //   top: 0,
        //   left: 0,
        //   bottom: 0,
        //   right: 0,
        // },
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        width: '100% !important',
        padding: '0 !important',
        '& > .MuiFormHelperText-root': {
          position: 'absolute',
          bottom: '-1.25rem',
          fontSize: '0.75rem',
          color: COLOR.success,
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        // border: `.0625rem solid ${COLOR.inputBorder} !important`,
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 'normal',
        '& > fieldset': {
          border: 'none !important',
        },
        '&.Mui-focused fieldset': {
          border: `.0625rem solid ${COLOR.black} !important`,
        },
        '& > input': {
          height: '2.5rem',
          padding: '0.62rem 1.31rem',
          boxSizing: 'border-box',
          backgroundColor: COLOR.white,
        },
        '& > .MuiSelect-select': {
          height: '2.5rem !important',
          padding: '0.62rem 1.31rem',
          boxSizing: 'border-box',
          backgroundColor: COLOR.white,
        },
        '&.Mui-error': {
          borderColor: `${COLOR.error} !important`,
        },
        // [theme.breakpoints.down('lg')]: {
        //   fontSize: '0.75rem',
        //   '& > input': {
        //     padding: '0.9rem 0.9rem',
        //   },
        //   '& > .MuiSelect-select': {
        //     padding: '0.9rem 0.9rem !important',
        //   },
        // },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        backgroundColor: COLOR.white,
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: COLOR.white,
        '&.Mui-focused': {
          color: COLOR.white,
        },
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
  MuiSkeleton: {
    styleOverrides: {
      root: {
        width: '100%',
        height: '100%',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: '0 0 1.25rem 1.25rem',
      },
    },
  },
});
