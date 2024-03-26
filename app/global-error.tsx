'use client';

import { Typography } from '@mui/material';

import * as S from './global-error.styles';

import { BaseError } from '@/(server)/error';

type GlobalErrorProps = {
  error: BaseError & { digest?: string };
  reset: () => void;
};

const GlobalError: React.FC<GlobalErrorProps> = ({ error, reset }) => {
  return (
    <S.Container>
      <S.GlobalErrorContentContainer>
        <S.GlobalErrorTitleContainer>
          <Typography variant='h1' fontWeight='bold'>
            Error
          </Typography>
          <Typography variant='h5' fontWeight='bold'>
            Digest - {error.digest}
          </Typography>
        </S.GlobalErrorTitleContainer>
        <Typography variant='h3' fontWeight='bold'>
          [{error.code}] {error.type}
        </Typography>
        <Typography variant='h4' fontWeight='bold'>
          Oops!, It&apos;s a big deal (maybe)
        </Typography>
        <Typography
          variant='h4'
          fontWeight='bold'
          style={{
            height: '3.125rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
          }}>
          {error.message}
        </Typography>
        <S.GlobalErrorResetButton
          onClick={() => reset()}
          spellCheck={false}
          style={{ textTransform: 'none' }}>
          Don&apos;t worry, just reset by &apos;Click Here&apos;
        </S.GlobalErrorResetButton>
      </S.GlobalErrorContentContainer>
    </S.Container>
  );
};

export default GlobalError;
