import { Typography } from '@mui/material';

import styles from './SubTitle.module.scss';

type SubTitleProps = {
  children: React.ReactNode;
};

export const SubTitle: React.FC<SubTitleProps> = ({ children }) => {
  return (
    <Typography variant='h3' fontWeight='500' className={styles.subTitle} textAlign='center'>
      {children}
    </Typography>
  );
};
