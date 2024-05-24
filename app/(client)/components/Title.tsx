import { Typography } from '@mui/material';

import styles from './Title.module.scss';

type TitleProps = {
  children: React.ReactNode;
};

export const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Typography variant='h1' className={styles.title} textAlign='center'>
      {children}
    </Typography>
  );
};
