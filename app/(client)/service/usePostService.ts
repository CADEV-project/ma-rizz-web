import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const queryKeys = {
  default: ['post'] as const,
  list: () => [...queryKeys.default, 'list'],
  detail: (postId: string) => [...queryKeys.default, postId],
};

const queryOptions = {
  list: () => ({
    queryKey: queryKeys.list(),
    // TODO: Implement this.
    queryFn: ({ pageParam }: { pageParam: number }) =>
      new Promise(resolve => resolve(pageParam)) as any,
    initialPageParam: 1,
    getNextPageParam: (lastPage: number) => lastPage + 1,
    getPreviousPageParam: (firstPage: number) => firstPage - 1,
  }),
  detail: (postId: string) => ({
    queryKey: queryKeys.detail(postId),
    queryFn: () => {
      /** TODO: Implement this */
    },
  }),
};

export const usePostList = () => useInfiniteQuery(queryOptions.list());

export const usePostDetail = (postId: string) => useQuery(queryOptions.detail(postId));
