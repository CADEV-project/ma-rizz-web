import Link from 'next/link';

import { Typography } from '@mui/material';

import styles from './NavigateText.module.scss';

type NavigateTextProps = {
  href: string;
  text: string;
};

export const NavigateText: React.FC<NavigateTextProps> = ({ href, text }) => {
  return (
    <Link className={styles.container} href={href}>
      <Typography fontWeight='bold'>{text}</Typography>
    </Link>
  );
};
