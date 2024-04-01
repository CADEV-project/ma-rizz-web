import { UserSchema } from '@/(server)/model';

export type AuthUpdateMeRequestBody = Pick<
  UserSchema,
  'name' | 'image' | 'phoneNumber' | 'age' | 'gender' | 'postalCode' | 'address' | 'addressDetail'
>;
