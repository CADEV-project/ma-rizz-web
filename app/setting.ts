/** NOTE: Back-end Settings */
export const SERVER_SETTINGS = {
  ENVIRONMENT: process.env.ENVIRONMENT,
  DATABASE_URL: process.env.DATABASE_URL,
  CRYPTION_SALT_ROUND: process.env.CRYPTION_SALT_ROUND,
  JWT_SECRET: process.env.JWT_SECRET,
  KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
  KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
} as const;

/** NOTE: Front-end Settings */
export const CLIENT_SETTINGS = {
  ENVIRONMENT: process.env.ENVIRONMENT,
  API_URL: process.env.NEXT_PUBLIC_API_URL,
} as const;
