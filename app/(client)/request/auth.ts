import { baseAPIRequest } from '.';

import { AuthDeleteRequestSearchParams } from '@/(server)/api/auth/delete/type';
import {
  AuthDuplicateEmailCheckRequestSearchParams,
  AuthDuplicateEmailCheckResponse,
} from '@/(server)/api/auth/duplicate-email-check/type';
import {
  AuthFindMyEmailRequestSearchParams,
  AuthFindMyEmailResponse,
} from '@/(server)/api/auth/find-my-email/type';
import { AuthMeResponse } from '@/(server)/api/auth/me/type';
import { AuthPasswordResetRequestBody } from '@/(server)/api/auth/password-reset/type';
import { AuthSignUpRequestBody } from '@/(server)/api/auth/sign-up/type';
import { AuthUpdateEmailRequestBody } from '@/(server)/api/auth/update/email/type';
import { AuthUpdateMeRequestBody } from '@/(server)/api/auth/update/me/type';
import { AuthUpdatePasswordRequestBody } from '@/(server)/api/auth/update/password/type';
import { AuthUpdateStatusRequestBody } from '@/(server)/api/auth/update/status/type';
import { API_URL } from '@/constant';

export const authDulicateEmailCheckRequest = async ({
  email,
}: AuthDuplicateEmailCheckRequestSearchParams) => {
  const response = await baseAPIRequest<AuthDuplicateEmailCheckResponse>({
    method: 'get',
    url: API_URL.auth.duplicateEmailCheck,
    params: { email },
  });

  return response.data;
};

export const authSignUpRequest = async ({
  email,
  password,
  name,
  phoneNumber,
  age,
  gender,
  address,
}: AuthSignUpRequestBody) => {
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

export const authFindMyEmailRequest = async ({
  phoneNumber,
  isVerified,
}: AuthFindMyEmailRequestSearchParams) => {
  const response = await baseAPIRequest<AuthFindMyEmailResponse>({
    method: 'get',
    url: API_URL.auth.findMyEmail,
    params: {
      isVerified,
      phoneNumber,
    },
  });

  return response.data;
};

export const authPasswordResetRequest = async ({
  email,
  newPassword,
  isVerified,
}: AuthPasswordResetRequestBody) => {
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

export const authUpdateEmailRequest = async ({ email }: AuthUpdateEmailRequestBody) => {
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

export const authUpdatePasswordRequest = async ({
  currentPassword,
  newPassword,
}: AuthUpdatePasswordRequestBody) => {
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

export const authUpdateMeRequest = async ({
  name,
  phoneNumber,
  age,
  gender,
  address,
}: AuthUpdateMeRequestBody) => {
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

export const authUpdateStatusRequest = async ({ status }: AuthUpdateStatusRequestBody) => {
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

export const authDeleteRequest = async ({ password }: AuthDeleteRequestSearchParams) => {
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
