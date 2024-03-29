import { UserSchema } from '@/(server)/model';

export type AuthSSORegisterRequestBody = Omit<
  UserSchema,
  '_id' | 'password' | 'createdAt' | 'updatedAt'
>;
