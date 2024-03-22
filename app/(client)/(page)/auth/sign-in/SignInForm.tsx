'use client';

import { signIn } from 'next-auth/react';
import {
  FieldErrors,
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';

import { Button } from '@mui/material';

import * as S from './SignInForm.styles';

type SignInFormProps = {
  email: string;
  password: string;
};

const SIGN_IN_FORM_DEFAULT_VALUES: SignInFormProps = {
  email: '',
  password: '',
};

export const SignInForm: React.FC = () => {
  const signInForm = useForm<SignInFormProps>();

  const onSignInFormSuccess = async ({ email, password }: SignInFormProps) => {
    await signIn('credentials', {
      email,
      password,
    });
  };

  const onSignInFormError = (field: FieldErrors<SignInFormProps>) => {
    console.error('Sign In Form Error', field);
  };

  return (
    <S.Container>
      <FormContainer
        formContext={signInForm}
        defaultValues={SIGN_IN_FORM_DEFAULT_VALUES}
        onSuccess={onSignInFormSuccess}
        onError={onSignInFormError}>
        <S.FormContainer>
          <TextFieldElement name='email' label='Email' required />
          <PasswordElement name='password' label='비밀번호' type='password' required />
          <Button type='submit'>로그인</Button>
        </S.FormContainer>
      </FormContainer>
    </S.Container>
  );
};
