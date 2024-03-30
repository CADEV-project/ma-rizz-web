'use client';

import { Skeleton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import * as S from './UserInfo.styles';

import { SmartImage } from '@/(client)/component';

import { userMeRequest } from '@/(client)/request/userRequest';
import { API_URL, ROUTE_URL } from '@/constant';

export const UserInfo: React.FC = () => {
  const { data, isLoading } = useQuery({ queryKey: [API_URL.user.me], queryFn: userMeRequest });

  if (isLoading) return <Skeleton variant='rounded' width={100} height={40} />;

  if (!data) return <S.SignInLink href={ROUTE_URL.auth.signIn}>SIGN IN</S.SignInLink>;

  return (
    <S.Container href={ROUTE_URL.user.me}>
      <S.ProfileImageContainer>
        <SmartImage alt='user-profile-image' src={data.image} variant='circular' />
      </S.ProfileImageContainer>
      <Typography variant='h5'>{data.name}</Typography>
    </S.Container>
  );
};
