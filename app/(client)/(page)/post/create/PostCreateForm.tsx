'use client';

import { useRouter } from 'next/navigation';
import {
  FieldErrors,
  FormContainer,
  TextFieldElement,
  TextareaAutosizeElement,
  useForm,
} from 'react-hook-form-mui';

import { Typography } from '@mui/material';

import * as S from './PostCreateForm.styles';

import { useAuth } from '@/(client)/hook';
import { PostCreateRequestProps } from '@/(client)/request';
import { usePostMutation } from '@/(client)/service';

import { ROUTE_URL } from '@/constant';

type PostCreateFormProps = PostCreateRequestProps;

const POST_CREATE_FORM_DEFAULT_VALUES: PostCreateFormProps = {
  title: '',
  content: '',
};

export const PostCreateForm: React.FC = () => {
  const { hasAuth } = useAuth();
  const router = useRouter();
  const { postCreateMutation } = usePostMutation(hasAuth);
  const postCreateForm = useForm<PostCreateFormProps>({
    defaultValues: POST_CREATE_FORM_DEFAULT_VALUES,
  });

  const onPostCreateFormSuccess = async ({ title, content }: PostCreateFormProps) => {
    try {
      await postCreateMutation({ title, content });

      router.push(ROUTE_URL.post.prefix);
    } catch (error) {
      console.info(error);
    }
  };

  const onPostCreateFormError = (field: FieldErrors<PostCreateFormProps>) => {
    console.error('Post Create Form Error', field);
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <Typography variant='h1'>Story</Typography>
        <Typography variant='h5'>하고싶은 이야기가 뭐에요?</Typography>
      </S.TitleContainer>
      <FormContainer
        formContext={postCreateForm}
        onSuccess={onPostCreateFormSuccess}
        onError={onPostCreateFormError}>
        <S.FormContainer>
          <TextFieldElement name='title' placeholder='주제가 뭔가요?' />
          <TextareaAutosizeElement name='content' placeholder='어떤 이야기인가요?' rows={5} />
          <S.PostCreateButton type='submit'>이야기보따리에 넣기</S.PostCreateButton>
        </S.FormContainer>
      </FormContainer>
      <S.DividerContainer>
        <S.Divider />
        <S.DividerText>OR</S.DividerText>
      </S.DividerContainer>
      <S.GoToPostListLink href={ROUTE_URL.post.prefix}>이야기보따리로 가기</S.GoToPostListLink>
    </S.Container>
  );
};
