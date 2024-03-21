/** NOTE: Back-end Settings */
export const SERVER_SETTINGS = {
  DATABASE_URL: process.env.DATABASE_URL,
} as const;

/** NOTE: Front-end Settings */
export const CLIENT_SETTINGS = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
} as const;
