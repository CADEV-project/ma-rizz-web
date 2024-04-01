'use client';

import { useRouter } from 'next/navigation';

import * as S from './PostDetail.styles';

import { useAuth } from '@/(client)/hook';
import { usePostDetail, usePostMutation } from '@/(client)/service';

import { ROUTE_URL } from '@/constant';

type PostDetailProps = { postId: string };

export const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const router = useRouter();
  const { hasAuth } = useAuth();
  const { data, isLoading } = usePostDetail(postId, hasAuth);
  const { postDeleteMutation } = usePostMutation(hasAuth);

  const onGoToPostListButtonClick = () => {
    router.push(ROUTE_URL.post.prefix);
  };

  const onDeleteButtonClick = async () => {
    await postDeleteMutation({ postId });

    router.push(ROUTE_URL.post.prefix);
  };

  if (isLoading) return <S.Container>Loading...</S.Container>;

  if (!data) {
    return <S.Container>There is no post.</S.Container>;
  }

  return (
    <S.Container>
      <S.ButtonContainer>
        <S.GoToPostListButton onClick={onGoToPostListButtonClick}>목록으로</S.GoToPostListButton>
        {data.user.isMe && <S.UpdateButton>수정하기</S.UpdateButton>}
        {data.user.isMe && <S.DeleteButton onClick={onDeleteButtonClick}>삭제하기</S.DeleteButton>}
      </S.ButtonContainer>
      <S.Title>{data.title}</S.Title>
      <S.Content>{data.content}</S.Content>
    </S.Container>
  );
};
