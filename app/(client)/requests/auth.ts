import { baseAPIRequest } from '.';

import { Gender } from '@/(server)/unions';

import { API_URL } from '@/constants';

type AuthSignUpRequestParams = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  age: string;
  gender: Gender;
  address: string;
};

export const authSignUpRequest = async ({
  email,
  password,
  name,
  phoneNumber,
  age,
  gender,
  address,
}: AuthSignUpRequestParams) => {
  const response = await baseAPIRequest<void>({
    method: 'post',
    url: API_URL.auth.signUp,
    data: {
      email,
      password,
      name,
      phoneNumber,
      age,
      gender,
      address,
    },
  });

  return response.data;
};
