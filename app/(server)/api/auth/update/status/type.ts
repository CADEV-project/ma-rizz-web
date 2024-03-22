import { UserSchema } from '@/(server)/model';

export type AuthUpdateStatusRequestBody = Pick<UserSchema, 'status'>;
