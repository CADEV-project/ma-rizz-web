import { Typography } from '@mui/material';

import styles from './ContentDescription.module.scss';

type ContentDescriptionProps = {
  children: React.ReactNode;
};

export const ContentDescription: React.FC<ContentDescriptionProps> = ({ children }) => {
  return (
    <Typography className={styles.contentDescription} variant='h4'>
      {children}
    </Typography>
  );
};
