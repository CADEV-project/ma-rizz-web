'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FieldErrors,
  FormContainer,
  TextFieldElement,
  TextareaAutosizeElement,
  useForm,
} from 'react-hook-form-mui';

import { Typography } from '@mui/material';

import * as S from './PostDetail.styles';

import { useAuth } from '@/(client)/hook';
import { PostUpdateRequestProps } from '@/(client)/request';
import { usePostDetail, usePostMutation } from '@/(client)/service';

import { ROUTE_URL } from '@/constant';

type PostUpdateFormProps = PostUpdateRequestProps;

type PostDetailProps = { postId: string };

export const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const router = useRouter();
  const { hasAuth } = useAuth();
  const { data, isLoading } = usePostDetail(postId, hasAuth);
  const { postUpdateMutation, postDeleteMutation } = usePostMutation(hasAuth);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const postUpdateForm = useForm<PostUpdateFormProps>({
    defaultValues: { title: data?.title, content: data?.content },
  });

  const onGoToPostListButtonClick = () => {
    router.push(ROUTE_URL.post.prefix);
  };

  const onUpdateButtonClick = () => {
    setIsUpdateMode(true);
  };

  const onDeleteButtonClick = async () => {
    await postDeleteMutation({ postId });

    router.push(ROUTE_URL.post.prefix);
  };

  const onPostUpdateFormSuccess = async ({ title, content }: PostUpdateFormProps) => {
    try {
      await postUpdateMutation({ postId, title, content });

      router.push(ROUTE_URL.post.prefix);
    } catch (error) {
      console.info(error);
    }
  };

  const onPostUpdateFormError = (field: FieldErrors<PostUpdateFormProps>) => {
    console.error('Post Update Form Error', field);
  };

  if (isLoading) return <S.Container>Loading...</S.Container>;

  if (!data) {
    return <S.Container>There is no post.</S.Container>;
  }

  const onUnableUpdateButtonClick = () => {
    setIsUpdateMode(false);
  };

  if (isUpdateMode)
    return (
      <S.UpdateContainer>
        <S.TitleContainer>
          <Typography variant='h1'>Story</Typography>
          <Typography variant='h5'>하고싶은 이야기가 뭐에요?</Typography>
        </S.TitleContainer>
        <FormContainer
          formContext={postUpdateForm}
          onSuccess={onPostUpdateFormSuccess}
          onError={onPostUpdateFormError}>
          <S.FormContainer>
            <TextFieldElement name='title' placeholder='주제가 뭔가요?' />
            <TextareaAutosizeElement name='content' placeholder='어떤 이야기인가요?' rows={5} />
            <S.PostUpdateButton type='submit'>내용을 변경해주세요.</S.PostUpdateButton>
          </S.FormContainer>
        </FormContainer>
        <S.DividerContainer>
          <S.Divider />
          <S.DividerText>OR</S.DividerText>
        </S.DividerContainer>
        <S.UnableUpdateButton onClick={onUnableUpdateButtonClick}>
          수정하지 않아요
        </S.UnableUpdateButton>
      </S.UpdateContainer>
    );

  return (
    <S.Container>
      <S.ButtonContainer>
        <S.GoToPostListButton onClick={onGoToPostListButtonClick}>목록으로</S.GoToPostListButton>
        {data.user.isMe && <S.UpdateButton onClick={onUpdateButtonClick}>수정하기</S.UpdateButton>}
        {data.user.isMe && <S.DeleteButton onClick={onDeleteButtonClick}>삭제하기</S.DeleteButton>}
      </S.ButtonContainer>
      <S.Title>{data.title}</S.Title>
      <S.Content>{data.content}</S.Content>
    </S.Container>
  );
};
