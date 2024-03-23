import { UserSchema } from '@/(server)/model';

export type AuthMeResponse = Omit<UserSchema, '_id' | 'password' | 'refreshToken'>;
