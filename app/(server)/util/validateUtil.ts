import { ValidationFailed } from '../error';

export const emailRegexValidate = (email: string) => {
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'email', reason: 'REGEX_NOT_MATCHED' }],
    });
  }
};

export const passwordRegexValidate = (password: string) => {
  const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  if (!PASSWORD_REGEX.test(password)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'password', reason: 'REGEX_NOT_MATCHED' }],
    });
  }
};

export const phoneNumberRegexValidate = (phoneNumber: string) => {
  const PHONE_NUMBER_REGEX = /^\d{3}\d{3,4}\d{4}$/;

  if (!PHONE_NUMBER_REGEX.test(phoneNumber)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'phoneNumber', reason: 'REGEX_NOT_MATCHED' }],
    });
  }
};

export const ageRegexValidate = (age: string) => {
  const AGE_REGEX = /^\d{1,3}$/;

  if (!AGE_REGEX.test(age)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'age', reason: 'REGEX_NOT_MATCHED' }],
    });
  }
};

export const genderRegexvalidate = (gender: string) => {
  const GENDER_REGEX = /^(male|female)$/;

  if (!GENDER_REGEX.test(gender)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'gender', reason: 'REGEX_NOT_MATCHED' }],
    });
  }
};

export const accountStatusRegexValidate = (status: string) => {
  const ACCOUNT_STATUS_REGEX = /^(active|inactive|pending|withdrew)$/;

  if (!ACCOUNT_STATUS_REGEX.test(status)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'accountStatus', reason: 'REGEX_NOT_MATCHED' }],
    });
  }
};

export const accountTypeRegexValidate = (type: string) => {
  const ACCOUNT_TYPE_REGEX = /^(credentials|kakao|google)$/;

  if (!ACCOUNT_TYPE_REGEX.test(type)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'accountType', reason: 'REGEX_NOT_MATCHED' }],
    });
  }
};

export const numberRegex = (value: string) => {
  const NUMBER_REGEX = /^\d+$/;

  if (!NUMBER_REGEX.test(value)) {
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: [{ field: 'number', reason: 'REGEX_NOT_MATCHED' }],
    });
  }
};

type ValidateParams = {
  email?: string;
  password?: string;
  phoneNumber?: string;
  age?: string;
  gender?: string;
  accountStatus?: string;
  accountType?: string;
  numbers?: string[];
};

export const validate = ({
  email,
  password,
  phoneNumber,
  age,
  gender,
  accountStatus,
  accountType,
  numbers,
}: ValidateParams) => {
  if (email) emailRegexValidate(email);
  if (password) passwordRegexValidate(password);
  if (phoneNumber) phoneNumberRegexValidate(phoneNumber);
  if (age) ageRegexValidate(age);
  if (gender) genderRegexvalidate(gender);
  if (accountStatus) accountStatusRegexValidate(accountStatus);
  if (accountType) accountTypeRegexValidate(accountType);
  if (numbers && numbers.length) numbers.forEach(number => numberRegex(number));
};
