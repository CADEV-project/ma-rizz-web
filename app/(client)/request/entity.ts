import { Gender } from '@/(server)/union';

export type User = {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  age: string;
  gender: Gender;
  address: string;
};
