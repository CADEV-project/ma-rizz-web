export type Gender = keyof typeof GENDER;

export const GENDER = {
  male: 'male',
  female: 'female',
} as const;
