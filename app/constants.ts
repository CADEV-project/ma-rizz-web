/** NOTE: Back-end Constants Part */
export const API_URL = {
  health: '/health',
  auth: {
    duplicateEmailCheck: '/auths/duplicate-email-check',
    signUp: '/auths/sign-up',
    signIn: '/auths/sign-in',
    findMyEmail: '/auths/find-my-email',
    passwordReset: '/auths/password-reset',
    me: '/auths/me',
    signOut: '/auths/sign-out',
    update: {
      email: '/auths/updates/email',
      password: '/auths/updates/password',
      me: '/auths/updates/me',
      status: '/auths/updates/status',
    },
    delete: '/auths/delete',
  },
} as const;

/** NOTE: Front-end Constants Part */
export const ROUTE_URL = {
  home: '/',
  error: '/error',
  auths: {
    signUp: '/auths/sign-up',
    signIn: '/auths/sign-in',
    findMyEmail: '/auths/find-my-email',
    passwordReset: '/auths/password-reset',
    me: '/auths/me',
    updates: {
      email: '/auths/updates/email',
      password: '/auths/updates/password',
      me: '/auths/updates/me',
    },
  },
  users: {
    new: '/users/new',
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
