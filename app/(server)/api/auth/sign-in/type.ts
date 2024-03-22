import { UserSchema } from '@/(server)/model';

export type AuthSignInRequestBody = {
  email: string;
  password: string;
};

export type AuthSignInResponse = Omit<UserSchema, '_id' | 'password'> & { id: string };
