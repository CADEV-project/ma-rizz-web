import { Model, model, models, Schema, Types } from 'mongoose';

import { Gender } from '@/(server)/union';
import { emailValidate, phoneNumberValidate, ageValidate, genderValidate } from '@/(server)/util';

export type UserSchema = {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  image?: string;
  phoneNumber: string;
  age: string;
  gender: Gender;
  address: string;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<UserSchema>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidate,
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    phoneNumber: { type: String, required: true, validate: phoneNumberValidate },
    age: { type: String, required: true, validate: ageValidate },
    gender: { type: String, required: true, validate: genderValidate },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

export const UserModel =
  (models.Users as Model<UserSchema>) || model<UserSchema>('Users', userSchema);
