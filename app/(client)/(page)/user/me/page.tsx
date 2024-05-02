import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { Component } from './Component';

import { healthRequest } from '@/(client)/requests';
import { getQueryClient } from '@/(client)/services';

import { API_URL } from '@/constant';

const Page: React.FC = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [API_URL.health],
    queryFn: healthRequest,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <h1>/user/me</h1>
        <h3>Me Page</h3>
        <h5>마이 페이지</h5>
        <Component />
      </section>
    </HydrationBoundary>
  );
};

export default Page;
