import { UserSchema } from '@/(server)/model';

export type AuthUpdateMeRequestBody = Pick<
  UserSchema,
  'name' | 'phoneNumber' | 'age' | 'gender' | 'address'
>;
