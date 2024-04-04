import { ConnectOptions, Types, connect } from 'mongoose';

import { InternalServerError, NotFound } from '@/(error)';

import { SERVER_SETTINGS } from '@/setting';

let cachedMongoose = global.mongoose;

if (!cachedMongoose)
  cachedMongoose = global.mongoose = { connection: null, createConnectionPromise: null };

export const getConnection = async () => {
  if (!SERVER_SETTINGS.DATABASE_URL)
    throw new NotFound({ type: 'NotFound', code: 404, detail: 'DATABASE_URL' });

  if (cachedMongoose.connection) return cachedMongoose.connection;

  if (!cachedMongoose.createConnectionPromise) {
    const options: ConnectOptions = {
      maxPoolSize: 10,
      bufferCommands: false,
    };

    cachedMongoose.createConnectionPromise = connect(SERVER_SETTINGS.DATABASE_URL, options)
      .then(mongoose => mongoose)
      .catch(() => {
        throw new InternalServerError({
          type: 'InternalServerError',
          code: 500,
        });
      });
  }

  try {
    cachedMongoose.connection = await cachedMongoose.createConnectionPromise;

    return cachedMongoose.connection;
  } catch (error) {
    cachedMongoose.createConnectionPromise = null;

    throw error;
  }
};

export const getObjectId = (id: string) => {
  return new Types.ObjectId(id);
};
