import { ConnectOptions, Types, connect } from 'mongoose';

import { NotFound } from '@/(error)';

import { SERVER_SETTINGS } from '@/setting';

export const getConnection = async () => {
  if (!SERVER_SETTINGS.DATABASE_URL)
    throw new NotFound({ type: 'NotFound', code: 404, detail: 'DATABASE_URL' });

  const options: ConnectOptions = {
    maxPoolSize: 10,
    bufferCommands: false,
  };

  return await connect(SERVER_SETTINGS.DATABASE_URL, options);
};

export const getObjectId = (id: string) => {
  return new Types.ObjectId(id);
};
