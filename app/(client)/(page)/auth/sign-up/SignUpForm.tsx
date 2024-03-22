'use client';

import { useRouter } from 'next/navigation';
import {
  FieldErrors,
  FormContainer,
  PasswordElement,
  RadioButtonGroup,
  TextFieldElement,
  useFormContext,
} from 'react-hook-form-mui';

import { Button } from '@mui/material';

import * as S from './SignUpForm.styles';

import { AuthSignUpRequestParams, authSignUpRequest } from '@/(client)/request';

import { ROUTE_URL } from '@/constant';

type SignUpFormProps = AuthSignUpRequestParams & { passwordAccept: string };

const SIGN_UP_FORM_DEFAULT_VALUES: SignUpFormProps = {
  email: '',
  password: '',
  passwordAccept: '',
  name: '',
  phoneNumber: '',
  age: '',
  gender: 'male',
  address: '',
};

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const signUpFormContext = useFormContext<SignUpFormProps>();

  const onSignUpFormSuccess = async ({
    email,
    password,
    passwordAccept,
    name,
    phoneNumber,
    age,
    gender,
    address,
  }: SignUpFormProps) => {
    try {
      if (password !== passwordAccept) throw new Error('비밀번호가 일치하지 않습니다.');

      await authSignUpRequest({
        email,
        password,
        name,
        phoneNumber,
        age,
        gender,
        address,
      });

      router.push(ROUTE_URL.home);
    } catch (error) {
      console.info(error);
    }
  };

  const onSignUpFormError = async (field: FieldErrors<SignUpFormProps>) => {
    console.error('Sign Up Form Error', field);
  };

  return (
    <S.Container>
      <FormContainer
        context={signUpFormContext}
        defaultValues={SIGN_UP_FORM_DEFAULT_VALUES}
        onSuccess={onSignUpFormSuccess}
        onError={onSignUpFormError}>
        <TextFieldElement name='email' label='Email' required />
        <PasswordElement name='password' label='비밀번호' type='password' required />
        <PasswordElement name='passwordAccept' label='비밀번호 확인' type='password' required />
        <TextFieldElement name='name' label='이름' required />
        <TextFieldElement name='phoneNumber' label='핸드폰' />
        <TextFieldElement name='age' label='나이' />
        <RadioButtonGroup
          name='gender'
          label='성별'
          valueKey='value'
          options={[
            { id: 'gender-option1', label: '남성', value: 'male' },
            { id: 'gender-option2', label: '여성', value: 'female' },
          ]}
          row
        />
        <TextFieldElement name='address' label='주소' />
        <Button type='submit'>회원가입</Button>
      </FormContainer>
    </S.Container>
  );
};
