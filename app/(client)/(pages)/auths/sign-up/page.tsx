import styles from './page.module.css';
import { SignUpForm } from './SignUpForm';

const AuthSignUpPage: React.FC = () => {
  return (
    <section className={styles.container}>
      <SignUpForm />
    </section>
  );
};

export default AuthSignUpPage;
