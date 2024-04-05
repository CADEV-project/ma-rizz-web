'use client';

import { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import axios from 'axios';
import { connect } from 'socket.io-client';

import { SOCKET_SERVER_API_URL } from '@/constant';
import { CLIENT_SETTINGS } from '@/setting';

export const SocketComponent: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<number>(0);

  const onButtonClick = async () => {
    try {
      await axios.get(
        `${CLIENT_SETTINGS.SOCKER_SERVER_DOMAIN}${CLIENT_SETTINGS.SOCKET_SERVER_API_PREFIX}${SOCKET_SERVER_API_URL.socket}`
      );
    } catch (error) {
      console.info(error);
    }
  };

  useEffect(() => {
    const socket = connect(CLIENT_SETTINGS.SOCKER_SERVER_DOMAIN);

    socket.on('getNewUser', (userCount: number) => {
      setCurrentUser(userCount);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Test Component :: [{currentUser}]</h1>
      <Button onClick={onButtonClick}>소켓통신 :: 새 유저 하나 추가요~</Button>
    </div>
  );
};
