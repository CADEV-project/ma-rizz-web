'use client';

import { Typography } from '@mui/material';

import * as S from './error.styles';

import { BaseError } from '@/(error)';

type ErrorProps = {
  error: BaseError & { digest?: string };
  reset: () => void;
};

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <S.Container>
      <S.ErrorContentContainer>
        <S.ErrorTitleContainer>
          <Typography variant='h1' fontWeight='bold'>
            Error
          </Typography>
          <Typography variant='h5' fontWeight='bold'>
            Digest - {error.digest}
          </Typography>
        </S.ErrorTitleContainer>
        <Typography variant='h3' fontWeight='bold'>
          [{error.code}] {error.type}
        </Typography>
        <Typography variant='h4' fontWeight='bold'>
          Oops!, something went wrong
        </Typography>
        <S.ErrorResetButton
          onClick={() => reset()}
          spellCheck={false}
          style={{ textTransform: 'none' }}>
          Don&apos;t worry, just reset by &apos;Click Here&apos;
        </S.ErrorResetButton>
      </S.ErrorContentContainer>
    </S.Container>
  );
};

export default Error;
