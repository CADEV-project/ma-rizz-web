import { baseAPIRequest } from '.';

import { User } from '@/(server)/entities';
import { Gender, UserStatus } from '@/(server)/unions';

import { API_URL } from '@/constants';

type AuthDuplicateEmailCheckParams = {
  email: string;
};

type AuthDuplicateEmailCheckResponse = {
  isDuplicate: boolean;
};

export const authDulicateEmailCheckRequest = async ({ email }: AuthDuplicateEmailCheckParams) => {
  const response = await baseAPIRequest<AuthDuplicateEmailCheckResponse>({
    method: 'get',
    url: API_URL.auth.duplicateEmailCheck,
    params: { email },
  });

  return response.data;
};

export type AuthSignUpRequestParams = Omit<User, 'id' | 'status'>;

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

type AuthSignInParams = {
  email: string;
  password: string;
};

type AuthSignInResponse = {
  accessToken: string;
  refreshToken: string;
};

export const authSignInRequest = async ({ email, password }: AuthSignInParams) => {
  const response = await baseAPIRequest<AuthSignInResponse>({
    method: 'post',
    url: API_URL.auth.signIn,
    data: {
      email,
      password,
    },
  });

  return response.data;
};

type AuthFindMyEmailParams = {
  isVerified: boolean;
  phoneNumber: string;
};

export const authFindMyEmailRequest = async ({
  phoneNumber,
  isVerified,
}: AuthFindMyEmailParams) => {
  const response = await baseAPIRequest<void>({
    method: 'get',
    url: API_URL.auth.findMyEmail,
    params: {
      isVerified,
      phoneNumber,
    },
  });

  return response.data;
};

type AuthPasswordResetParams = {
  email: string;
  newPassword: string;
  isVerified: boolean;
};

export const authPasswordResetRequest = async ({
  email,
  newPassword,
  isVerified,
}: AuthPasswordResetParams) => {
  const response = await baseAPIRequest<void>({
    method: 'patch',
    url: API_URL.auth.passwordReset,
    data: {
      email,
      newPassword,
      isVerified,
    },
  });

  return response.data;
};

export type AuthMeResponse = Omit<User, 'id'>;

export const authMeRequest = async () => {
  const response = await baseAPIRequest<AuthMeResponse>({
    method: 'get',
    url: API_URL.auth.me,
    tokenType: 'required',
  });

  return response.data;
};

export const authSignOutRequest = async () => {
  const response = await baseAPIRequest<void>({
    method: 'post',
    url: API_URL.auth.signOut,
    tokenType: 'required',
  });

  return response.data;
};

type AuthUpdateEmailParams = {
  email: string;
};

export const authUpdateEmailRequest = async ({ email }: AuthUpdateEmailParams) => {
  const response = await baseAPIRequest<void>({
    method: 'patch',
    url: API_URL.auth.update.email,
    data: {
      email,
    },
    tokenType: 'required',
  });

  return response.data;
};

type AuthUpdatePasswordParams = {
  currentPassword: string;
  newPassword: string;
};

export const authUpdatePasswordRequest = async ({
  currentPassword,
  newPassword,
}: AuthUpdatePasswordParams) => {
  const response = await baseAPIRequest<void>({
    method: 'patch',
    url: API_URL.auth.update.password,
    data: {
      currentPassword,
      newPassword,
    },
    tokenType: 'required',
  });

  return response.data;
};

type AuthUpdateMeParams = {
  name: string;
  phoneNumber: string;
  age: string;
  gender: Gender;
  address: string;
};

export const authUpdateMeRequest = async ({
  name,
  phoneNumber,
  age,
  gender,
  address,
}: AuthUpdateMeParams) => {
  const response = await baseAPIRequest<void>({
    method: 'patch',
    url: API_URL.auth.update.me,
    data: {
      name,
      phoneNumber,
      age,
      gender,
      address,
    },
    tokenType: 'required',
  });

  return response.data;
};

type AuthUpdateStatusParams = {
  status: UserStatus;
};

export const authUpdateStatusRequest = async ({ status }: AuthUpdateStatusParams) => {
  const response = await baseAPIRequest<void>({
    method: 'patch',
    url: API_URL.auth.update.status,
    data: {
      status,
    },
    tokenType: 'required',
  });

  return response.data;
};

type AuthDeleteParams = {
  password: string;
};

export const authDeleteRequest = async ({ password }: AuthDeleteParams) => {
  const response = await baseAPIRequest<void>({
    method: 'delete',
    url: API_URL.auth.delete,
    params: {
      password,
    },
    tokenType: 'required',
  });

  return response.data;
};
