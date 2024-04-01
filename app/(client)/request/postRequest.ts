import { baseRequest } from '.';

import { PostDetailRequestParams, PostDetailResponse } from '@/(server)/api/post/[postId]/type';
import { PostCreateRequestBody } from '@/(server)/api/post/create/type';
import { PostDeleteRequestParams } from '@/(server)/api/post/delete/[postId]/type';
import { PostListResponse, PostRequestSearchParams } from '@/(server)/api/post/type';
import {
  PostUpdateRequestBody,
  PostUpdateRequestParams,
} from '@/(server)/api/post/update/[postId]/type';
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

export type PostDeleteRequestProps = PostDeleteRequestParams['params'];

export const postDeleteRequest = async ({ postId }: PostDeleteRequestProps) => {
  const response = await baseRequest<void>({
    method: 'delete',
    url: `${API_URL.post.delete}/${postId}`,
  });

  return response.data;
};

export type PostUpdateRequestProps = PostUpdateRequestBody & PostUpdateRequestParams['params'];

export const postUpdateRequest = async ({ postId, title, content }: PostUpdateRequestProps) => {
  const response = await baseRequest<void>({
    method: 'put',
    url: `${API_URL.post.update}/${postId}`,
    data: { title, content },
  });

  return response.data;
};

export type PostRequestProps = PostRequestSearchParams;

export type PostRequestReturn = PostListResponse;

export const postRequest = async ({ cursor, limit }: PostRequestProps) => {
  const response = await baseRequest<PostRequestReturn>({
    method: 'get',
    url: API_URL.post.prefix,
    params: { cursor, limit },
  });

  return response.data;
};
