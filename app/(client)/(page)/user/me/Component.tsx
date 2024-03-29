'use client';

import { useEffect, useState } from 'react';

import { UserMeResponse, userMeRequest } from '@/(client)/request/userRequest';

export const Component: React.FC = () => {
  const [user, setUser] = useState<UserMeResponse>();

  const getUser = async () => {
    const user = await userMeRequest();

    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);
  return <>{JSON.stringify(user)}</>;
};
