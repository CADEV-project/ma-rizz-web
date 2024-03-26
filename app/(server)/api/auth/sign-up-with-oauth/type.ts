import { AccountSchema } from '@/(server)/model';

export type AuthSignUpWithOAuthRequestBody = { type: 'kakao' } & Pick<AccountSchema, 'accountId'>;
