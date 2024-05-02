import styles from './page.module.css';

import { CommonLayout } from '@/(client)/component';

const Page: React.FC = async () => {
  return (
    <CommonLayout>
      <div className={styles.container}>
        <section className={styles.box}>
          <h1>Home Page</h1>
        </section>
      </div>
    </CommonLayout>
  );
};

export default Page;
