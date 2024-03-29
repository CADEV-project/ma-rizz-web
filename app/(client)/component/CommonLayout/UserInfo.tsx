'use client';

import { useEffect, useState } from 'react';

import { Skeleton, Typography } from '@mui/material';

import * as S from './UserInfo.styles';

import { SmartImage } from '@/(client)/component';

import { UserMeResponse, userMeRequest } from '@/(client)/request/userRequest';
import { ROUTE_URL } from '@/constant';

export const UserInfo: React.FC = () => {
  const [user, setUser] = useState<UserMeResponse | null | undefined>(undefined);

  const getUser = async () => {
    const user = await userMeRequest();

    setUser(user);
  };

  useEffect(() => {
    getUser();
    getUser();
    getUser();
    getUser();
    getUser();
  }, []);

  if (user === undefined) return <Skeleton variant='rounded' width={100} height={40} />;

  if (user === null) return <S.SignInLink href={ROUTE_URL.auth.signIn}>SIGN IN</S.SignInLink>;

  return (
    <S.Container href={ROUTE_URL.user.me}>
      <S.ProfileImageContainer>
        <SmartImage alt='user-profile-image' src={user.image} variant='circular' />
      </S.ProfileImageContainer>
      <Typography variant='h5'>{user.name}</Typography>
    </S.Container>
  );
};
