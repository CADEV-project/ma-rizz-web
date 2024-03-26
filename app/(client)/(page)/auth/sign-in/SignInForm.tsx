'use client';

import { useRouter } from 'next/navigation';
import {
  FieldErrors,
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';

import { Typography } from '@mui/material';

import * as S from './SignInForm.styles';

import { AuthSignInRequestBody, authSignInRequest } from '@/(client)/request';

import { ROUTE_URL } from '@/constant';

type SignInFormProps = AuthSignInRequestBody;

const SIGN_IN_FORM_DEFAULT_VALUES: SignInFormProps = {
  email: '',
  password: '',
};

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const signInForm = useForm<SignInFormProps>();

  const onSignInFormSuccess = async ({ email, password }: SignInFormProps) => {
    try {
      const authSignInRequestData = await authSignInRequest({ email, password });

      console.info(authSignInRequestData);

      // TODO: Add tokens
      // router.push(ROUTE_URL.home);
    } catch (error) {
      // TODO: Handle error.
      console.info(error);
    }
  };

  const onSignInFormError = (field: FieldErrors<SignInFormProps>) => {
    console.error('Sign In Form Error', field);
  };

  const onKakaoLoginButtonClick = async () => {
    // TOOD: Implement Kakao login.
    // await signIn('kakao');
  };

  const onSignUpButtonClick = () => {
    router.push(ROUTE_URL.auth.signUp);
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <Typography variant='h1' fontWeight='bold'>
          로그인
        </Typography>
        <Typography variant='h5' fontWeight='300' align='right'>
          환영해요! 다시 와주셔서 기뻐요
        </Typography>
      </S.TitleContainer>
      <FormContainer
        formContext={signInForm}
        defaultValues={SIGN_IN_FORM_DEFAULT_VALUES}
        onSuccess={onSignInFormSuccess}
        onError={onSignInFormError}>
        <S.FormContainer>
          <TextFieldElement name='email' label='Email' required />
          <PasswordElement
            name='password'
            label='비밀번호'
            type='password'
            required
            style={{ marginBottom: '1rem' }}
          />
          <S.LoginButton type='submit'>이메일로 로그인하기</S.LoginButton>
          <S.KakaoLoginButton onClick={onKakaoLoginButtonClick}>
            카카오로 로그인하기
          </S.KakaoLoginButton>
        </S.FormContainer>
      </FormContainer>
      <S.DividerContainer>
        <S.Divider />
        <S.DividerText>OR</S.DividerText>
      </S.DividerContainer>
      <S.SignUpButton onClick={onSignUpButtonClick}>회원가입</S.SignUpButton>
    </S.Container>
  );
};
