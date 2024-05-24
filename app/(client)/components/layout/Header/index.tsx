import styles from './index.module.scss';
import { Logo } from './Logo';
import { NavigateText } from './NavigateText';

import { ROUTE_URL } from '@/constant';

export const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.navigationContainer}>
        <NavigateText href={ROUTE_URL.experience} text='체험하기' />
        <NavigateText href={ROUTE_URL.notification} text='알림받기' />
      </div>
    </div>
  );
};
