import { Header } from './Header';
import styles from './index.module.css';

type CommonLayoutProps = {
  children: React.ReactNode;
};

export const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <nav className={styles.nav}>Common Layout Navigation</nav>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Common Layout Footer</footer>
    </>
  );
};
