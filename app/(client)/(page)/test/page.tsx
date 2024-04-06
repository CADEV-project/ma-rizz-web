import { NextPage } from 'next';

import { ImageTest } from './ImageTest';
import styles from './page.module.css';

const Page: NextPage = () => {
  return (
    <section className={styles.imageTestSection}>
      <ImageTest />
    </section>
  );
};

export default Page;
