import { useMutation } from '@tanstack/react-query';

import {
  authDuplicateEmailCheckRequest,
  authSignInRequest,
  authSignUpRequest,
  authVerificationCodeSendRequest,
} from '../request';

export const useAuthMutation = () => {
  const { mutateAsync: authSignUpMutation } = useMutation({ mutationFn: authSignUpRequest });

  const { mutateAsync: authSignInMutation } = useMutation({ mutationFn: authSignInRequest });

  const { mutateAsync: authDuplicateEmailCheckMutation } = useMutation({
    mutationFn: authDuplicateEmailCheckRequest,
  });

  const { mutateAsync: authVerificationCodeSendMutation } = useMutation({
    mutationFn: authVerificationCodeSendRequest,
  });

  return {
    authSignUpMutation,
    authSignInMutation,
    authDuplicateEmailCheckMutation,
    authVerificationCodeSendMutation,
  };
};
