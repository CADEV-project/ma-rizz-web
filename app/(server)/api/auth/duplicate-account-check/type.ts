import { AccountSchema } from '@/(server)/model';

export type AuthDuplicateAccountCheckRequestSearchParams = Required<
  Pick<AccountSchema, 'type' | 'productAccountId'>
>;

export type AuthDuplicateAccountCheckResponse = {
  isDuplicate: boolean;
};
