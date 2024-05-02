/** NOTE: Back-end Part */
export const API_URL = {
  reservation: '/apis/reservation',
} as const;

/** NOTE: Front-end Part */
export const ROUTE_URL = {
  home: '/',
  experience: '/experience',
} as const;

export const OUTER_LINK = {
  termOfUse: 'https://www.naver.com',
  privacyPolicy: 'https://www.naver.com',
} as const;

export type ThemeMode = keyof typeof THEME_MODE;

export const THEME_MODE = {
  light: 'light',
  dark: 'dark',
} as const;

export const DEFAULT_THEME_MODE = THEME_MODE['dark'];

export const COLOR = {
  black: '#000000',
  white: '#ffffff',
  success: '#00c851',
  successHover: '#007e33',
  info: '#33b5e5',
  infoHover: '#0099cc',
  warning: '#ffbb33',
  warningHover: '#ff8800',
  error: '#ff4444',
  errorHover: '#cc0000',
  blackAlpha: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
  whiteAlpha: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
} as const;

/** NOTE: General Part */
export const COOKIE_KEY = {
  themeMode: 'ma-rizz-theme-mode',
} as const;

export const LOCAL_STORAGE_KEY = {
  themeMode: 'ma-rizz-theme-mode',
} as const;

export const SESSION_STORAGE_KEY = {} as const;

export const MILLISECOND_TIME_FORMAT = {
  millisecond: 1,
  seconds: (second: number) => MILLISECOND_TIME_FORMAT.millisecond * 1000 * second,
  minutes: (minute: number) => MILLISECOND_TIME_FORMAT.seconds(60) * minute,
  hours: (hour: number) => MILLISECOND_TIME_FORMAT.minutes(60) * 60 * hour,
  days: (day: number) => MILLISECOND_TIME_FORMAT.hours(24) * day,
} as const;

export const DIGITAL_FORMAT = {
  kiloByte: 1024,
  megaByte: (megaByte: number) => Math.pow(DIGITAL_FORMAT.kiloByte, 2) * megaByte,
} as const;
