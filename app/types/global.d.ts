import _mongoose, { connect } from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    createConnectionPromise: ReturnType<typeof connect> | null;
    connection: typeof _mongoose | null;
  };
}
