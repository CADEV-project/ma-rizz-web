import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PostListResponse } from '@/(server)/api/post/type';

import {
  postCreateRequest,
  postDeleteRequest,
  postDetailRequest,
  postRequest,
  postUpdateRequest,
} from '@/(client)/request';

const postQueryKeys = {
  default: ['post'] as const,
  list: (hasAuth: boolean) => [...postQueryKeys.default, 'list', { hasAuth: hasAuth }],
  detail: (postId: string, hasAuth: boolean) => [
    ...postQueryKeys.default,
    postId,
    { hasAuth: hasAuth },
  ],
};

export const postQueryOptions = {
  list: (hasAuth: boolean) => ({
    queryKey: postQueryKeys.list(hasAuth),
    queryFn: ({ pageParam = 0 }) => postRequest({ cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: PostListResponse) => lastPage.nextCursor,
    enabled: hasAuth !== undefined,
  }),
  detail: (postId: string, hasAuth: boolean) => ({
    queryKey: postQueryKeys.detail(postId, hasAuth),
    queryFn: () => postDetailRequest({ postId }),
    enabled: hasAuth !== undefined,
  }),
};

export const usePostList = (hasAuth: boolean) => useInfiniteQuery(postQueryOptions.list(hasAuth));

export const usePostDetail = (postId: string, hasAuth: boolean) =>
  useQuery(postQueryOptions.detail(postId, hasAuth));

export const usePostMutation = (hasAuth: boolean) => {
  const queryClient = useQueryClient();

  const { mutateAsync: postCreateMutation } = useMutation({
    mutationFn: postCreateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.list(hasAuth) });
    },
  });

  const { mutateAsync: postUpdateMutation } = useMutation({
    mutationFn: postUpdateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.list(hasAuth) });
    },
  });

  const { mutateAsync: postDeleteMutation } = useMutation({
    mutationFn: postDeleteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.list(hasAuth) });
    },
  });

  return {
    postCreateMutation,
    postUpdateMutation,
    postDeleteMutation,
  };
};
