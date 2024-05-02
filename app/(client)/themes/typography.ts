import { TypographyOptions } from '@mui/material/styles/createTypography';

import { combinedFontFamily } from '@/(client)/utils';

export const typography: TypographyOptions = {
  fontFamily: combinedFontFamily,
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontSize: '3rem',
    fontWeight: '700',
    lineHeight: 'normal',
  },
  h2: {
    fontSize: '2.25rem',
    fontWeight: '700',
    lineHeight: 'normal',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: '400',
    lineHeight: 'normal',
  },
  h4: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: 'normal',
  },
  h5: {
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: 'normal',
  },
  h6: {
    fontSize: '.75rem',
    fontWeight: '400',
    lineHeight: 'normal',
  },
};