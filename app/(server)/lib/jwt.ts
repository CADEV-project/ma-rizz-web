import jwt, { JwtPayload } from 'jsonwebtoken';

import { Forbidden, NotFound } from '@/(server)/error';

import { SERVER_SETTINGS } from '@/setting';

const getAccessToken = (payload: JwtPayload) => {
  const ACCESS_TOKEN_EXPIRES_IN = '24h';

  if (!SERVER_SETTINGS.JWT_SECRET)
    throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['JWT_SECRET'] } });

  return jwt.sign(payload, SERVER_SETTINGS.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

const getAccessTokenExpiry = () => {
  const now = new Date();

  const expirtyDate = now.setDate(now.getDate() + 1);

  return expirtyDate;
};

const getRefreshToken = (payload: JwtPayload) => {
  const REFRESH_TOKEN_EXPIRES_IN = '30d';

  if (!SERVER_SETTINGS.JWT_SECRET)
    throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['JWT_SECRET'] } });

  return jwt.sign(payload, SERVER_SETTINGS.JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
};

export const getSignedTokens = (payload: JwtPayload) => {
  const accessToken = getAccessToken(payload);
  const accessTokenExpiry = getAccessTokenExpiry();
  const refreshToken = getRefreshToken(payload);

  return { accessToken, accessTokenExpiry, refreshToken };
};

export const getDecodedToken = (token: string) => {
  try {
    if (!SERVER_SETTINGS.JWT_SECRET)
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['JWT_SECRET'] } });

    return jwt.verify(token, SERVER_SETTINGS.JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new Forbidden({
      type: 'Forbidden',
      code: 403,
      detail: { error: error as Error },
    });
  }
};
