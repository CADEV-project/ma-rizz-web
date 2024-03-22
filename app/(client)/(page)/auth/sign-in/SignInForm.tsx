'use client';

import { signIn } from 'next-auth/react';
import {
  FieldErrors,
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useFormContext,
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
  const signInFormContext = useFormContext<SignInFormProps>();

  const onSignInFormSuccess = async ({ email, password }: SignInFormProps) => {
    await signIn('Credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: 'http://localhost:3000',
    });
  };

  const onSignInFormError = (field: FieldErrors<SignInFormProps>) => {
    console.error('Sign In Form Error', field);
  };

  return (
    <S.Container>
      <FormContainer
        context={signInFormContext}
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
