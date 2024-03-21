import { ConnectOptions, connect } from 'mongoose';

import { SERVER_SETTINGS } from '@/settings';

let cachedMongoose = global.mongoose;

if (!cachedMongoose)
  cachedMongoose = global.mongoose = { connection: null, createConnection: null };

export const dbConnect = async () => {
  // TOOD: Implement error handling.
  if (!SERVER_SETTINGS.DATABASE_URL) throw new Error('DATABASE_URL is not defined');

  if (cachedMongoose.connection) return cachedMongoose.connection;

  if (!cachedMongoose.createConnection) {
    const options: ConnectOptions = {
      bufferCommands: false,
    };

    cachedMongoose.createConnection = connect(SERVER_SETTINGS.DATABASE_URL, options)
      .then(mongoose => {
        // TODO: Implement logging.
        console.info('DB connection has created successfully.');

        return mongoose;
      })
      .catch(error => {
        // TODO: Implement logging.
        console.error('DB connection has failed to create.', error);

        throw error;
      });
  }

  try {
    cachedMongoose.connection = await cachedMongoose.createConnection;

    return cachedMongoose.connection;
  } catch (error) {
    cachedMongoose.createConnection = null;

    throw error;
  }
};
