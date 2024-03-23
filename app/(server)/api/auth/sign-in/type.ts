export type AuthSignInRequestBody = {
  email: string;
  password: string;
};

export type AuthSignInResponse = {
  accessToken: string;
  accessTokenExpiry: number;
  refreshToken: string;
};
