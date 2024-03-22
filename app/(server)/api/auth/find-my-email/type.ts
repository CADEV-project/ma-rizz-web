export type AuthFindMyEmailRequestSearchParams = {
  phoneNumber: string;
  isVerified: boolean;
};

export type AuthFindMyEmailResponse = {
  email: string;
};
