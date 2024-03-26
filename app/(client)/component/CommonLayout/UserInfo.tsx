'use client';

import { Typography } from '@mui/material';

import * as S from './UserInfo.styles';

import { SmartImage } from '@/(client)/component';

import { ROUTE_URL } from '@/constant';

type UserInfoProps = {
  name: string;
  profileImage?: string;
};

export const UserInfo: React.FC<UserInfoProps> = ({ name, profileImage }) => {
  const user = undefined;

  if (!user) return <S.SignInLink href={ROUTE_URL.auth.signIn}>SIGN IN</S.SignInLink>;

  return (
    <S.Container href={ROUTE_URL.user.me}>
      <S.ProfileImageContainer>
        <SmartImage alt='user-profile-image' src={profileImage} variant='circular' />
      </S.ProfileImageContainer>
      <Typography variant='h5'>{name}</Typography>
    </S.Container>
  );
};
