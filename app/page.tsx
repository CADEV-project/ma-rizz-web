'use client';

import { useEffect } from 'react';

import axios from 'axios';

const HomePage: React.FC = () => {
  const healthCheck = async () => {
    try {
      const res = await axios.get('/apis/health?type=test');

      console.info(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    healthCheck();
  }, []);

  return (
    <main>
      <h1>/</h1>
      <h3>Home Page</h3>
      <h5>홈 페이지</h5>
    </main>
  );
};

export default HomePage;
