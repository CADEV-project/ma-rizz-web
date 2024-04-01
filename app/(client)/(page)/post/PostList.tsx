'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import * as S from './PostList.styles';

import { SmartImage } from '@/(client)/component';
import { useAuth } from '@/(client)/hook';
import { usePostList } from '@/(client)/service';

import { ROUTE_URL } from '@/constant';

export const PostList: React.FC = () => {
  const { hasAuth } = useAuth();
  const { data, isLoading, fetchNextPage } = usePostList(hasAuth);
  const [pageIndex, setPageIndex] = useState(0);

  const postPage = useMemo(() => data?.pages.at(pageIndex), [data?.pages, pageIndex]);

  const onPostPrevButtonClick = async () => {
    setPageIndex(pageIndex => {
      if (pageIndex > 0) return pageIndex - 1;

      return pageIndex;
    });
  };

  const onPostNextButtonClick = async () => {
    await fetchNextPage();

    setPageIndex(pageIndex => pageIndex + 1);
  };

  if (isLoading) return <S.Container>Loading...</S.Container>;

  if (!postPage) return <S.Container>There is no post.</S.Container>;

  return (
    <S.Container>
      {postPage.data.map(post => (
        <PostListItem
          key={`post-list-item-${post._id}`}
          postId={post._id}
          title={post.title}
          content={post.content}
          updatedAt={post.updatedAt}
        />
      ))}
      <S.PostHandleButtonContainer>
        <S.PostRrevButton
          disabled={postPage.prevCursor === undefined}
          onClick={onPostPrevButtonClick}>
          이전
        </S.PostRrevButton>
        <S.PostNextButton
          disabled={postPage.nextCursor === undefined}
          onClick={onPostNextButtonClick}>
          다음
        </S.PostNextButton>
      </S.PostHandleButtonContainer>
    </S.Container>
  );
};

type PostListItemProps = {
  postId: string;
  title: string;
  content: string;
  updatedAt: Date;
};

const PostListItem: React.FC<PostListItemProps> = ({ postId, title, content, updatedAt }) => {
  const router = useRouter();

  const onPostListItemClick = () => {
    router.push(`${ROUTE_URL.post.prefix}/${postId}`);
  };

  return (
    <S.PostContainer alignItems='center' onClick={onPostListItemClick}>
      <S.PostUserImageContainer>
        <SmartImage alt={`post-user-image-${'id'}`} variant='circular' />
      </S.PostUserImageContainer>
      <S.PostTextItemContainer>
        <S.PostTitleContainer>
          <S.PostTitle>{title}</S.PostTitle>
          <S.PostDate>{updatedAt.toString()}</S.PostDate>
        </S.PostTitleContainer>
        <S.PostContent>{content}</S.PostContent>
      </S.PostTextItemContainer>
    </S.PostContainer>
  );
};
