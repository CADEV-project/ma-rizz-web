'use client';

import NextImage from 'next/image';
import { useEffect, useState } from 'react';

import { CommonLayout } from './(client)/component';

import dog1 from '#/images/dog1.jpg';
import dog2 from '#/images/dog2.jpg';

const Page: React.FC = () => {
  const [position, setPosition] = useState<'frame1' | 'frame2'>('frame1');

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev === 'frame1') {
          return 'frame2';
        }

        return 'frame1';
      });
    }, 500);

    return () => clearInterval(interval);
  }, [position]);

  return (
    <CommonLayout>
      <h1>/</h1>
      <h3>Home Page</h3>
      <h5>홈 페이지</h5>
      <NextImage alt='running-dog' src={position === 'frame1' ? dog1 : dog2} />
    </CommonLayout>
  );
};

export default Page;
