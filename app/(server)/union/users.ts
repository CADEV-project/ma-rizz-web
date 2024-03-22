export type Gender = keyof typeof GENDER;

export const GENDER = {
  male: 'male',
  female: 'female',
} as const;

export type UserStatus = keyof typeof USER_STATUS;

export const USER_STATUS = {
  active: 'active',
  inactive: 'inactive',
  withdrew: 'withdrew',
} as const;
