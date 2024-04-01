export type AuthFindMyEmailRequestSearchParams = {
  phoneNumber: string;
  verificationCode: string;
};

export type AuthFindMyEmailResponse = {
  email: string;
};
