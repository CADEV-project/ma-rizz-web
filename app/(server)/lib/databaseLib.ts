import { ConnectOptions, Types, connect } from 'mongoose';

import { InternalServerError, NotFound } from '@/(server)/error';

import { SERVER_SETTINGS } from '@/setting';

let cachedMongoose = global.mongoose;

if (!cachedMongoose)
  cachedMongoose = global.mongoose = { connection: null, createConnectionPromise: null };

export const getConnection = async () => {
  if (!SERVER_SETTINGS.DATABASE_URL)
    throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['DATABASE_URL'] } });

  if (cachedMongoose.connection) return cachedMongoose.connection;

  if (!cachedMongoose.createConnectionPromise) {
    const options: ConnectOptions = {
      bufferCommands: false,
    };

    cachedMongoose.createConnectionPromise = connect(SERVER_SETTINGS.DATABASE_URL, options)
      .then(mongoose => mongoose)
      .catch(error => {
        throw new InternalServerError({
          type: 'InternalServerError',
          code: 500,
          detail: { error: error as Error },
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
