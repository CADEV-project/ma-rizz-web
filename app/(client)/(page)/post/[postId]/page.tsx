import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import styles from './page.module.css';
import { PostDetail } from './PostDetail';

import { getQueryClient, postQueryOptions } from '@/(client)/service';

const prefetchData = async (postId: string) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(postQueryOptions.detail(postId));

  return dehydrate(queryClient);
};

type PageProps = {
  params: {
    postId: string;
  };
};

const Page: React.FC<PageProps> = async ({ params }) => {
  const dehydratedState = await prefetchData(params.postId);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={styles.container}>
        <section className={styles.titleSection}>
          <h1 className={styles.title}>게시글</h1>
        </section>
        <section className={styles.postSection}>
          <PostDetail postId={params.postId} />
        </section>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
