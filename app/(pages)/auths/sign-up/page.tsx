'use client';

import * as S from './page.styles';
import { SignUpForm } from './SignUpForm';

const AuthSignUpPage: React.FC = () => {
  return (
    <S.Container>
      <SignUpForm />
    </S.Container>
  );
};

export default AuthSignUpPage;
