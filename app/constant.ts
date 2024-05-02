/** NOTE: Back-end Part */
export const API_URL = {
  auth: {
    prefix: '/auth',
    delete: '/auth/delete',
    duplicateAccountCheck: '/auth/duplicate-account-check',
    duplicateEmailCheck: '/auth/duplicate-email-check',
    findMyAccount: '/auth/find-my-account',
    passwordReset: '/auth/password-reset',
    refreshToken: '/auth/refresh-token',
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    signUp: {
      prefix: '/auth/sign-up',
      information: '/auth/sign-up/information',
    },
    update: {
      prefix: '/update',
      email: '/auth/update/email',
      me: '/auth/update/me',
      password: '/auth/update/password',
      status: '/auth/update/status',
    },
    verificationCode: {
      prefix: '/verification-code',
      send: '/auth/verification-code/send',
    },
  },
  user: {
    prefix: '/user',
    me: '/user/me',
  },
} as const;

/** NOTE: Front-end Part */
export const ROUTE_URL = {
  home: '/',
  auth: {
    prefix: '/auth',
    signUp: '/auth/sign-up',
    signIn: '/auth/sign-in',
    findMyAccount: '/auth/find-my-account',
    passwordReset: {
      prefix: '/auth/password-reset',
      result: '/auth/password-reset/result',
    },
    new: '/auth/new',
  },
  user: {
    prefix: '/user',
    me: '/user/me',
  },
} as const;

export const UNAUTH_PROTECTED_PAGE_ROUTE: string[] = [] as const;

export const AUTH_PROTECTED_PAGE_ROUTE: string[] = [ROUTE_URL.user.me] as const;

export const SESSION_STORAGE_KEY = {
  authStore: 'auth-store',
} as const;

export const OUTER_LINK = {
  termOfUse: 'https://www.naver.com',
  privacyPolicy: 'https://www.naver.com',
  inquiry: 'https://www.naver.com',
} as const;

export const COLOR = {
  black: '#000000',
  white: '#ffffff',
  success: '',
  successHover: '',
  info: '',
  infoHover: '',
  error: '#ff0000',
  errorHover: '#cc0000',
  blackAlpha: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
  whiteAlpha: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
} as const;

/** NOTE: General Part */
export const MILLISECOND_TIME_FORMAT = {
  millisecond: 1,
  seconds: (second: number) => MILLISECOND_TIME_FORMAT.millisecond * 1000 * second,
  minutes: (minute: number) => MILLISECOND_TIME_FORMAT.seconds(60) * minute,
  hours: (hour: number) => MILLISECOND_TIME_FORMAT.minutes(60) * 60 * hour,
  days: (day: number) => MILLISECOND_TIME_FORMAT.hours(24) * day,
} as const;

export const COOKIE_KEY = {
  refreshToken: 'rizz-life-secure-refresh_token',
  autoSignIn: 'rizz-life-secure-auto_sign_in',
} as const;

export const DIGITAL_FORMAT = {
  kiloByte: 1024,
  megaByte: (megaByte: number) => Math.pow(DIGITAL_FORMAT.kiloByte, 2) * megaByte,
} as const;
