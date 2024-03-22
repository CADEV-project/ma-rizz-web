import styles from './page.module.css';
import { SignInForm } from './SignInForm';

const Page: React.FC = () => {
  return (
    <section className={styles.container}>
      <SignInForm />
    </section>
  );
};

export default Page;
