import { AccountSchema } from '@/(server)/model';

export type AuthSSOSignUpRequestBody = { type: 'kakao' } & Pick<AccountSchema, 'productAccountId'>;
