import { Model, model, models, Schema, Types } from 'mongoose';

import { Gender } from '../unions';

export type User = {
  id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  age: string;
  gender: Gender;
  address: string;
  createdAt: Date;
};

const userSchema = new Schema<User>(
  {
    id: { type: Schema.Types.ObjectId },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserEntity = (models.Users as Model<User>) || model<User>('Users', userSchema);
