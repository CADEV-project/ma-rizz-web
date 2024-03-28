import { AccountSchema, UserSchema } from '@/(server)/model';

export type UserMeResponse = Pick<AccountSchema, 'type'> &
  Omit<UserSchema, '_id' | 'password' | 'refreshToken'>;
