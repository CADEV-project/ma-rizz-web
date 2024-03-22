import { Types } from 'mongoose';

export const objectIdGenerator = (id: string) => {
  return new Types.ObjectId(id);
};
