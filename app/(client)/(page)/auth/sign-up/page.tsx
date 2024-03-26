import styles from './page.module.css';
import { SignUpForm } from './SignUpForm';

const Page: React.FC = () => {
  return (
    <section className={`${styles.Container} scrollableY`}>
      <SignUpForm />
    </section>
  );
};

export default Page;
