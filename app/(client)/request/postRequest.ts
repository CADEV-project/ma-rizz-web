import { baseRequest } from '.';

import { PostDetailRequestParams, PostDetailResponse } from '@/(server)/api/post/[postId]/type';
import { PostCreateRequestBody } from '@/(server)/api/post/create/type';
import { PostListResponse } from '@/(server)/api/post/type';
import { API_URL } from '@/constant';

export type PostDetailRequestProps = PostDetailRequestParams['params'];

export type PostDetailRequestReturn = PostDetailResponse;

export const postDetailRequest = async ({ postId }: PostDetailRequestProps) => {
  const response = await baseRequest<PostDetailRequestReturn>({
    method: 'get',
    url: `${API_URL.post.prefix}/${postId}`,
  });

  return response.data;
};

export type PostCreateRequestProps = PostCreateRequestBody;

export type PostCreateRequestReturn = PostCreateRequestBody;

export const postCreateRequest = async ({ title, content }: PostCreateRequestProps) => {
  const response = await baseRequest<PostCreateRequestReturn>({
    method: 'post',
    url: API_URL.post.create,
    data: { title, content },
  });

  return response.data;
};

export type PostRequestReturn = PostListResponse;

export const getPostRequest = async () => {
  const response = await baseRequest<PostRequestReturn>({
    method: 'get',
    url: API_URL.post.prefix,
  });

  return response.data;
};
