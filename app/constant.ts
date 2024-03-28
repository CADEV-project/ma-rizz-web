/** NOTE: Back-end Part */
export const API_URL = {
  health: '/health',
  auth: {
    duplicateEmailCheck: '/auth/duplicate-email-check',
    duplicateAccountCheck: '/auth/duplicate-account-check',
    signUp: '/auth/sign-up',
    signUpWithOAuth: '/auth/sign-up-with-oauth',
    signUpWithOAuthAdditionalInfo: '/auth/sign-up-with-oauth-additional-info',
    signIn: '/auth/sign-in',
    signInWithOAuth: '/auth/sign-in-with-oauth',
    findMyEmail: '/auth/find-my-email',
    passwordReset: '/auth/password-reset',
    signOut: '/auth/sign-out',
    update: {
      email: '/auth/update/email',
      password: '/auth/update/password',
      me: '/auth/update/me',
      status: '/auth/update/status',
    },
    refreshToken: '/auth/refresh-token',
    delete: '/auth/delete',
  },
  user: {
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
    findMyEmail: '/auth/find-my-email',
    passwordReset: '/auth/password-reset',
    new: '/auth/new',
    error: '/auth/error',
  },
  user: {
    prefix: '/user',
    me: '/user/me',
  },
} as const;

export const MILLISECOND_TIME_FORMAT = {
  millisecond: 1,
  seconds: (second: number) => MILLISECOND_TIME_FORMAT.millisecond * 1000 * second,
  minutes: (minute: number) => MILLISECOND_TIME_FORMAT.seconds(60) * minute,
  hours: (hour: number) => MILLISECOND_TIME_FORMAT.minutes(60) * 60 * hour,
  days: (day: number) => MILLISECOND_TIME_FORMAT.hours(24) * day,
} as const;

export const COLOR = {
  black: '#000000',
  white: '#ffffff',
  themePurple: '#743ad5',
  themePink: '#d53a9d',
  kakao: '#FFEB00',
  kakaoHover: '#C6A200',
  blackAlpha: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
  whiteAlpha: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
} as const;

/** NOTE: General Part */
export const COOKIE_KEY = {
  accessToken: 'nextjs_template-secure-access_token',
  refreshToken: 'nextje_template-secure-refresh_token',
} as const;

export type AuthorizationType = keyof typeof AUTHORIZATION_TYPE;

export const AUTHORIZATION_TYPE = {
  basic: 'Basic ',
  bearer: 'Bearer ',
} as const;

export const AUTHORIZATION = 'Authorization' as const;
