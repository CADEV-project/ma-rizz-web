import { Types } from 'mongoose';

export const objectId = (id: string) => {
  return new Types.ObjectId(id);
};
