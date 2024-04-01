import styles from './page.module.css';
import { PostCreateForm } from './PostCreateForm';

const Page: React.FC = () => {
  return (
    <div className={styles.container}>
      <PostCreateForm />
    </div>
  );
};

export default Page;
