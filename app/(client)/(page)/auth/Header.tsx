import Link from 'next/link';

import { Typography } from '@mui/material';

import styles from './Header.module.css';

import { SmartImage } from '@/(client)/component';

import { ROUTE_URL } from '@/constant';

import companyLogoImage from '#/images/company_logo.png';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.headerLeftBox} href={ROUTE_URL.home}>
        <div className={styles.companyLogoContainer}>
          <SmartImage alt='company-logo' src={companyLogoImage} />
        </div>
        <Typography variant='h5' fontWeight='bold'>
          Star Walkin&apos;
        </Typography>
      </Link>
      <Typography variant='h5' fontWeight='bold'>
        Enjoy your 3D :)
      </Typography>
    </header>
  );
};
