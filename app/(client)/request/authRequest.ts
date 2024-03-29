import { baseRequest } from '.';

import { AuthDeleteRequestSearchParams } from '@/(server)/api/auth/delete/type';
import {
  AuthDuplicateAccountCheckRequestSearchParams,
  AuthDuplicateAccountCheckResponse,
} from '@/(server)/api/auth/duplicate-account-check/type';
import {
  AuthDuplicateEmailCheckRequestSearchParams,
  AuthDuplicateEmailCheckResponse,
} from '@/(server)/api/auth/duplicate-email-check/type';
import {
  AuthFindMyEmailRequestSearchParams,
  AuthFindMyEmailResponse,
} from '@/(server)/api/auth/find-my-email/type';
import { AuthPasswordResetRequestBody } from '@/(server)/api/auth/password-reset/type';
import { AuthRefreshTokenResponse } from '@/(server)/api/auth/refresh-token/type';
import { AuthSignInRequestBody } from '@/(server)/api/auth/sign-in/type';
import { AuthSignUpRequestBody } from '@/(server)/api/auth/sign-up/type';
import { AuthSSORegisterRequestBody } from '@/(server)/api/auth/sso/register/type';
import { AuthSSOSignUpRequestBody } from '@/(server)/api/auth/sso/sign-up/type';
import { AuthUpdateEmailRequestBody } from '@/(server)/api/auth/update/email/type';
import { AuthUpdateMeRequestBody } from '@/(server)/api/auth/update/me/type';
import { AuthUpdatePasswordRequestBody } from '@/(server)/api/auth/update/password/type';
import { AuthUpdateStatusRequestBody } from '@/(server)/api/auth/update/status/type';
import { API_URL } from '@/constant';

export type { AuthDeleteRequestSearchParams };

export const authDeleteRequest = async ({ password }: AuthDeleteRequestSearchParams) => {
  const response = await baseRequest<void>({
    method: 'delete',
    url: API_URL.auth.delete,
    params: {
      password,
    },
  });

  return response.data;
};

export type { AuthDuplicateAccountCheckRequestSearchParams, AuthDuplicateAccountCheckResponse };

export const authDuplicateAccountCheckRequest = async ({
  type,
  productAccountId,
}: AuthDuplicateAccountCheckRequestSearchParams) => {
  const response = await baseRequest<AuthDuplicateAccountCheckResponse>({
    method: 'get',
    url: API_URL.auth.duplicateAccountCheck,
    params: { type, productAccountId },
  });

  return response.data;
};

export type { AuthDuplicateEmailCheckRequestSearchParams, AuthDuplicateEmailCheckResponse };

export const authDulicateEmailCheckRequest = async ({
  email,
}: AuthDuplicateEmailCheckRequestSearchParams) => {
  const response = await baseRequest<AuthDuplicateEmailCheckResponse>({
    method: 'get',
    url: API_URL.auth.duplicateEmailCheck,
    params: { email },
  });

  return response.data;
};

export type { AuthFindMyEmailRequestSearchParams, AuthFindMyEmailResponse };

export const authFindMyEmailRequest = async ({
  phoneNumber,
  isVerified,
}: AuthFindMyEmailRequestSearchParams) => {
  const response = await baseRequest<AuthFindMyEmailResponse>({
    method: 'get',
    url: API_URL.auth.findMyEmail,
    params: {
      isVerified,
      phoneNumber,
    },
  });

  return response.data;
};

export type { AuthPasswordResetRequestBody };

export const authPasswordResetRequest = async ({
  email,
  newPassword,
  isVerified,
}: AuthPasswordResetRequestBody) => {
  const response = await baseRequest<void>({
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

export type { AuthRefreshTokenResponse };

export const authRefreshTokenRequest = async () => {
  const response = await baseRequest<AuthRefreshTokenResponse>({
    method: 'post',
    url: API_URL.auth.refreshToken,
  });

  return response.data;
};

export type { AuthSignInRequestBody };

export const authSignInRequest = async ({ email, password, autoSignIn }: AuthSignInRequestBody) => {
  const response = await baseRequest<void>({
    method: 'post',
    url: API_URL.auth.signIn,
    data: {
      email,
      password,
      autoSignIn,
    },
  });

  return response.data;
};

export const authSignOutRequest = async () => {
  const response = await baseRequest<void>({
    method: 'post',
    url: API_URL.auth.signOut,
  });

  return response.data;
};

export type { AuthSignUpRequestBody };

export const authSignUpRequest = async ({
  email,
  password,
  name,
  image,
  phoneNumber,
  age,
  gender,
  address,
}: AuthSignUpRequestBody) => {
  const response = await baseRequest<void>({
    method: 'post',
    url: API_URL.auth.signUp,
    data: {
      email,
      password,
      name,
      image,
      phoneNumber,
      age,
      gender,
      address,
    },
  });

  return response.data;
};

export type { AuthSSORegisterRequestBody };

export const authSSORegister = async ({
  email,
  name,
  image,
  phoneNumber,
  age,
  gender,
  address,
}: AuthSSORegisterRequestBody) => {
  const response = await baseRequest<void>({
    method: 'post',
    url: API_URL.auth.sso.register,
    data: {
      email,
      name,
      image,
      phoneNumber,
      age,
      gender,
      address,
    },
  });

  return response.data;
};

export type { AuthSSOSignUpRequestBody };

export const authSSOSignUp = async ({ type, productAccountId }: AuthSSOSignUpRequestBody) => {
  const response = await baseRequest<void>({
    method: 'post',
    url: API_URL.auth.sso.signUp,
    data: {
      type,
      productAccountId,
    },
  });

  return response.data;
};

export type { AuthUpdateEmailRequestBody };

export const authUpdateEmailRequest = async ({ newEmail }: AuthUpdateEmailRequestBody) => {
  const response = await baseRequest<void>({
    method: 'patch',
    url: API_URL.auth.update.email,
    data: {
      newEmail,
    },
  });

  return response.data;
};

export type { AuthUpdateMeRequestBody };

export const authUpdateMeRequest = async ({
  name,
  phoneNumber,
  age,
  gender,
  address,
}: AuthUpdateMeRequestBody) => {
  const response = await baseRequest<void>({
    method: 'patch',
    url: API_URL.auth.update.me,
    data: {
      name,
      phoneNumber,
      age,
      gender,
      address,
    },
  });

  return response.data;
};

export type { AuthUpdatePasswordRequestBody };

export const authUpdatePasswordRequest = async ({
  currentPassword,
  newPassword,
}: AuthUpdatePasswordRequestBody) => {
  const response = await baseRequest<void>({
    method: 'patch',
    url: API_URL.auth.update.password,
    data: {
      currentPassword,
      newPassword,
    },
  });

  return response.data;
};

export type { AuthUpdateStatusRequestBody };

export const authUpdateStatusRequest = async ({ status }: AuthUpdateStatusRequestBody) => {
  const response = await baseRequest<void>({
    method: 'patch',
    url: API_URL.auth.update.status,
    data: {
      status,
    },
  });

  return response.data;
};
