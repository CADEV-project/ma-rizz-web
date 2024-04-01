import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

export const getQueryClient = cache(() => new QueryClient());

// type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// interface QueryProps<ResponseType = unknown> {
//   queryKey: QueryKey;
//   queryFn: () => Promise<ResponseType>;
// }

// interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
//   state: QueryState<TData, TError>;
// }

// const isEqual = (queryKey1: QueryKey, queryKey2: QueryKey) => {
//   return JSON.stringify(queryKey1) === JSON.stringify(queryKey2);
// };

// export const getDehydratedQuery = async <Q extends QueryProps>({ queryKey, queryFn }: Q) => {
//   const queryClient = getQueryClient();

//   await queryClient.prefetchQuery({ queryKey, queryFn });

//   const { queries } = dehydrate(queryClient);

//   const [dehydratedQuery] = queries.filter(query => isEqual(query.queryKey, queryKey));

//   return dehydratedQuery as DehydratedQueryExtended<UnwrapPromise<ReturnType<Q['queryFn']>>>;
// };

// export const getDehydratedInfiniteQuery = async <Q extends QueryProps>({ queryKey, queryFn }: Q) => {

// export const Hydrate = HydrationBoundary;
