/** NOTE: Back-end Constants Part */
export const API_URL = {
  health: '/health',
  auth: {
    duplicateCheck: '/auth/duplicate-check',
    delete: '/auth/delete',
    me: '/auth/me',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    update: '/auth/update',
    verify: '/auth/verify',
    passwordReset: '/auth/password-reset',
  },
} as const;

/** NOTE: Front-end Constants Part */
export const ROUTE_URL = {
  home: '/',
  error: '/error',
  auths: {
    signIn: '/auths/sign-in',
    verify: '/auths/verify',
    newUser: '/auths/new-user',
    error: '/auths/error',
  },
  users: {
    me: '/users/me',
  },
} as const;

export const TIME_FORMAT = {
  millisecond: 1,
  seconds: (second: number) => TIME_FORMAT.millisecond * 1000 * second,
  minutes: (minute: number) => TIME_FORMAT.seconds(60) * minute,
  hours: (hour: number) => TIME_FORMAT.minutes(60) * 60 * hour,
  days: (day: number) => TIME_FORMAT.hours(24) * day,
} as const;

export const COLOR = {
  black: '#000000',
  white: '#ffffff',
  blackAlpha: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
  whiteAlpha: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
} as const;
