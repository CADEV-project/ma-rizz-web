import Link from 'next/link';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import styles from './page.module.css';
import { PostList } from './PostList';

import { getQueryClient, postQueryOptions } from '@/(client)/service';

import { ROUTE_URL } from '@/constant';

const prefetchData = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(postQueryOptions.list());

  return dehydrate(queryClient);
};

const Page: React.FC = async () => {
  const dehydratedState = await prefetchData();

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={styles.container}>
        <section className={styles.titleSection}>
          <h1 className={styles.title}>자유게시판</h1>
          <Link className={styles.linkToPostCreate} href={ROUTE_URL.post.create}>
            하고싶은 이야기가 있나요?
          </Link>
        </section>
        <section className={styles.postSection}>
          <PostList />
        </section>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
