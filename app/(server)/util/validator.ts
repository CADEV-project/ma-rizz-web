import { ValidationFailed } from '../error';

export const emailValidator = (email: string) => {
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'email', reason: 'Regex not matched' }],
    });
  }
};

export const passwordValidator = (password: string) => {
  const PASSWORD_REGEX = /^[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  if (!PASSWORD_REGEX.test(password)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'password', reason: 'Regex not matched' }],
    });
  }
};

export const phoneNumberValidator = (phoneNumber: string) => {
  const PHONE_NUMBER_REGEX = /^\d{3}-\d{3,4}-\d{4}$/;

  if (!PHONE_NUMBER_REGEX.test(phoneNumber)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'phoneNumber', reason: 'Regex not matched' }],
    });
  }
};

export const ageValidator = (age: string) => {
  const AGE_REGEX = /^\d{1,3}$/;

  if (!AGE_REGEX.test(age)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'age', reason: 'Regex not matched' }],
    });
  }
};

export const genderValidator = (gender: string) => {
  const GENDER_REGEX = /^(male|female)$/;

  if (!GENDER_REGEX.test(gender)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'gender', reason: 'Regex not matched' }],
    });
  }
};
