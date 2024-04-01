import { UserSchema, VerificationSchema } from '@/(server)/model';

export type AuthSSORegisterRequestBody = Omit<
  UserSchema,
  '_id' | 'password' | 'createdAt' | 'updatedAt'
> &
  Pick<VerificationSchema, 'verificationCode'>;
