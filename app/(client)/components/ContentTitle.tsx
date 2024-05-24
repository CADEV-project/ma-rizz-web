import { Typography } from '@mui/material';

import styles from './ContentTitle.module.scss';

type ContentTitleProps = {
  children: React.ReactNode;
};

export const ContentTitle: React.FC<ContentTitleProps> = ({ children }) => {
  return (
    <Typography variant='h3' className={styles.contentTitle}>
      {children}
    </Typography>
  );
};
