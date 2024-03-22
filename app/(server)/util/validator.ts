import { ValidationFailed } from '../error';

export const emailValidate = (email: string) => {
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'email', reason: 'Regex not matched' }],
    });
  }
};

export const passwordValidate = (password: string) => {
  const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  if (!PASSWORD_REGEX.test(password)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'password', reason: 'Regex not matched' }],
    });
  }
};

export const phoneNumberValidate = (phoneNumber: string) => {
  const PHONE_NUMBER_REGEX = /^\d{3}\d{3,4}\d{4}$/;

  if (!PHONE_NUMBER_REGEX.test(phoneNumber)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'phoneNumber', reason: 'Regex not matched' }],
    });
  }
};

export const ageValidate = (age: string) => {
  const AGE_REGEX = /^\d{1,3}$/;

  if (!AGE_REGEX.test(age)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'age', reason: 'Regex not matched' }],
    });
  }
};

export const genderValidate = (gender: string) => {
  const GENDER_REGEX = /^(male|female)$/;

  if (!GENDER_REGEX.test(gender)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'gender', reason: 'Regex not matched' }],
    });
  }
};

type ValidatorParams = {
  email?: string;
  password?: string;
  phoneNumber?: string;
  age?: string;
  gender?: string;
};

export const validator = ({ email, password, phoneNumber, age, gender }: ValidatorParams) => {
  if (email) emailValidate(email);
  if (password) passwordValidate(password);
  if (phoneNumber) phoneNumberValidate(phoneNumber);
  if (age) ageValidate(age);
  if (gender) genderValidate(gender);
};
