/** NOTE: Back-end Part */
export const API_URL = {
  health: '/health',
  auth: {
    duplicateEmailCheck: '/auth/duplicate-email-check',
    signUp: '/auth/sign-up',
    signIn: '/auth/sign-in',
    findMyEmail: '/auth/find-my-email',
    passwordReset: '/auth/password-reset',
    me: '/auth/me',
    signOut: '/auth/sign-out',
    update: {
      email: '/auth/update/email',
      password: '/auth/update/password',
      me: '/auth/update/me',
      status: '/auth/update/status',
    },
    delete: '/auth/delete',
  },
} as const;

/** NOTE: Front-end Part */
export const ROUTE_URL = {
  home: '/',
  auths: {
    signUp: '/auth/sign-up',
    signIn: '/auth/sign-in',
    findMyEmail: '/auth/find-my-email',
    passwordReset: '/auth/password-reset',
    me: '/auth/me',
    new: '/auth/new',
    error: '/auth/error',
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
