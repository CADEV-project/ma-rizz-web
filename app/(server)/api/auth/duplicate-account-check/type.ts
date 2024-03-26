import { AccountSchema } from '@/(server)/model';

export type AuthDuplicateAccountCheckRequestSearchParams = Required<
  Pick<AccountSchema, 'type' | 'accountId'>
>;

export type AuthDuplicateAccountCheckResponse = {
  isDuplicate: boolean;
};
