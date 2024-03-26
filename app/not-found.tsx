'use client';

import { useRouter } from 'next/navigation';

import { Typography } from '@mui/material';

import { ROUTE_URL } from '@/constant';
import * as S from '@/not-found.styles';

const NotFound: React.FC = () => {
  const router = useRouter();

  const onNotFoundResetButtonClick = () => {
    router.push(ROUTE_URL.home);
  };

  return (
    <S.Container>
      <S.NotFoundContentContainer>
        <S.NotFoundTitleContainer>
          <Typography variant='h1' fontWeight='bold'>
            Error
          </Typography>
          <Typography variant='h5' fontWeight='bold'>
            No resource found
          </Typography>
        </S.NotFoundTitleContainer>
        <Typography variant='h3' fontWeight='bold'>
          [404] Not Found
        </Typography>
        <Typography variant='h4' fontWeight='bold'>
          You must be lost your way.
        </Typography>
        <S.NotFoundResetButton
          onClick={() => onNotFoundResetButtonClick()}
          spellCheck={false}
          style={{ textTransform: 'none' }}>
          Don&apos;t worry, go home by &apos;Click Here&apos;
        </S.NotFoundResetButton>
      </S.NotFoundContentContainer>
    </S.Container>
  );
};

export default NotFound;
