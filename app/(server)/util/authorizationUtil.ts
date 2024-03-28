import { Unauthorized } from '@/(server)/error';

import { AUTHORIZATION_TYPE } from '@/constant';

export const getDecodedBasicToken = (token: string) => {
  if (!token.startsWith(AUTHORIZATION_TYPE.basic))
    throw new Unauthorized({
      type: 'Unauthorized',
      code: 401,
      detail: { reason: 'BasicTokenRequired' },
    });

  return token.split(AUTHORIZATION_TYPE.basic)[1];
};

export const getDecodedBearerToken = (token: string) => {
  if (!token.startsWith(AUTHORIZATION_TYPE.bearer))
    throw new Unauthorized({
      type: 'Unauthorized',
      code: 401,
      detail: { reason: 'BearerTokenRequired' },
    });

  return token.split(AUTHORIZATION_TYPE.bearer)[1];
};
