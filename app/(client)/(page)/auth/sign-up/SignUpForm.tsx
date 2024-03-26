'use client';

import { useRouter } from 'next/navigation';
import {
  FieldErrors,
  FormContainer,
  PasswordElement,
  RadioButtonGroup,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';

import { Typography } from '@mui/material';

import * as S from './SignUpForm.styles';

import { AuthSignUpRequestBody, authSignUpRequest } from '@/(client)/request';

import { ROUTE_URL } from '@/constant';

type SignUpFormProps = AuthSignUpRequestBody & { passwordAccept: string };

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
  const signUpForm = useForm<SignUpFormProps>();

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
      if (password !== passwordAccept) {
        signUpForm.setError('passwordAccept', { message: '비밀번호가 일치하지 않습니다.' });

        return;
      }

      await authSignUpRequest({
        email,
        password,
        name,
        phoneNumber,
        age,
        gender,
        address,
      });

      router.push(ROUTE_URL.auth.signIn);
    } catch (error) {
      console.info(error);
    }
  };

  const onSignUpFormError = async (field: FieldErrors<SignUpFormProps>) => {
    console.error('Sign Up Form Error', field);
  };

  const onGoToSignInPageButtonClick = () => {
    router.push(ROUTE_URL.auth.signIn);
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <Typography variant='h1' fontWeight='bold'>
          회원가입
        </Typography>
        <Typography variant='h5' fontWeight='300' align='right'>
          제가 당신을 기억할 수 있도록 도와주실래요?
        </Typography>
      </S.TitleContainer>
      <FormContainer
        formContext={signUpForm}
        defaultValues={SIGN_UP_FORM_DEFAULT_VALUES}
        onSuccess={onSignUpFormSuccess}
        onError={onSignUpFormError}>
        <S.FormContainer>
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
        </S.FormContainer>
        <S.SignUpButton type='submit'>함께하기</S.SignUpButton>
      </FormContainer>
      <S.DividerContainer>
        <S.Divider />
        <S.DividerText>OR</S.DividerText>
      </S.DividerContainer>
      <S.GoToSignInPageButton onClick={onGoToSignInPageButtonClick}>
        계정이 기억났어요!
      </S.GoToSignInPageButton>
    </S.Container>
  );
};
