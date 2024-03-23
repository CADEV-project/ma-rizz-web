import { Model, model, models, Schema, Types } from 'mongoose';

import { Gender, USER_STATUS, UserStatus } from '@/(server)/union';
import { emailValidate, phoneNumberValidate, ageValidate, genderValidate } from '@/(server)/util';

export type UserSchema = {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  age: string;
  gender: Gender;
  address: string;
  status: UserStatus;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<UserSchema>(
  {
    _id: { type: Schema.Types.ObjectId },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidate,
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, validate: phoneNumberValidate },
    age: { type: String, required: true, validate: ageValidate },
    gender: { type: String, required: true, validate: genderValidate },
    address: { type: String, required: true },
    status: { type: String, default: USER_STATUS['active'] },
    refreshToken: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

export const UserModel =
  (models.Users as Model<UserSchema>) || model<UserSchema>('Users', userSchema);
