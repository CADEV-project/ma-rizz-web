import { Breakpoint, BreakpointsOptions } from '@mui/material';

const BREAK_POINT_VALUES: { [key in Breakpoint]: number } = {
  xs: 0,
  sm: 768,
  md: 1024,
  lg: 1440,
  xl: 1920,
};

export const breakpoints: BreakpointsOptions = {
  values: BREAK_POINT_VALUES,
  down: (key: keyof typeof BREAK_POINT_VALUES | number) =>
    `@media (max-width: ${typeof key === 'number' ? key : BREAK_POINT_VALUES[key] - 1}px)`,
};
