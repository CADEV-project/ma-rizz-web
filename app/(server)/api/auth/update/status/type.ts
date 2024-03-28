import { AccountSchema } from '@/(server)/model';

export type AuthUpdateStatusRequestBody = Pick<AccountSchema, 'status'>;
