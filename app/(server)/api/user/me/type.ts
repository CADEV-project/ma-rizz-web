import { UserSchema } from '@/(server)/model';

export type UserMeResponse = Omit<UserSchema, '_id' | 'password' | 'refreshToken'>;
