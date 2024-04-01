import { UserSchema, VerificationSchema } from '@/(server)/model';

export type AuthSignUpRequestBody = Omit<UserSchema, '_id' | 'createdAt' | 'updatedAt'> &
  Pick<VerificationSchema, 'verificationCode'>;
