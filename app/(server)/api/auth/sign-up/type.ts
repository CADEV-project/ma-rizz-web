import { UserSchema } from '@/(server)/model';

export type AuthSignUpRequestBody = Omit<
  UserSchema,
  '_id' | 'status' | 'refreshToken' | 'createdAt' | 'updatedAt'
>;
