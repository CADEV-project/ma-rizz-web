const DEFAULT_ENVIRONMENT = 'local';
const DEFAULT_DOMAIN = 'localhost:3000';
const DEFAULT_API_PREFIX = '/api';

/** NOTE: Backend Settings */
export const SERVER_SETTINGS = {
  // Project
  ENVIRONMENT: process.env.ENVIRONMENT ?? DEFAULT_ENVIRONMENT,
  DOMAIN: process.env.DOMAIN ?? DEFAULT_DOMAIN,
  API_PREFIX: process.env.API_PREFIX ?? DEFAULT_API_PREFIX,
} as const;

/** NOTE: Client Settings */
export const CLIENT_SETTINGS = {
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT ?? DEFAULT_ENVIRONMENT,
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN ?? DEFAULT_DOMAIN,
  API_PREFIX: process.env.NEXT_PUBLIC_API_PREFIX ?? DEFAULT_API_PREFIX,
} as const;
