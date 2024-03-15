'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import axios from 'axios';

import { CommonLayout } from './components';

const Page: React.FC = () => {
  const session = useSession();

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

    console.info('Session', session.data);
  }, []);

  return (
    <CommonLayout>
      <h1>/</h1>
      <h3>Home Page</h3>
      <h5>홈 페이지</h5>
    </CommonLayout>
  );
};

export default Page;
