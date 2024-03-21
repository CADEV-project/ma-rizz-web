'use client';

import NextImage from 'next/image';
import { useEffect } from 'react';

import axios from 'axios';

import { CommonLayout } from './(client)/components';

import earthWebP from '#/images/earth.webp';

const Page: React.FC = () => {
  const healthCheck = async () => {
    try {
      const res = await axios.get('/api/health?type=test');

      console.info(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    healthCheck();
  }, []);

  return (
    <CommonLayout>
      <h1>/</h1>
      <h3>Home Page</h3>
      <h5>홈 페이지</h5>
      <NextImage alt='web-p' src={earthWebP} />
    </CommonLayout>
  );
};

export default Page;
