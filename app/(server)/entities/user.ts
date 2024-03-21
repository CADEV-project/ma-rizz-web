import { Model, model, models, Schema, Types } from 'mongoose';

import { Gender, USER_STATUS, UserStatus } from '@/(server)/unions';
import { ageValidator, emailValidator, genderValidator, passwordValidator } from '@/(server)/utils';

export type User = {
  id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  age: string;
  gender: Gender;
  address: string;
  status: UserStatus;
};

const userSchema = new Schema<User>(
  {
    id: { type: Schema.Types.ObjectId },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidator,
    },
    password: { type: String, required: true, validate: passwordValidator },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    age: { type: String, required: true, validate: ageValidator },
    gender: { type: String, required: true, validate: genderValidator },
    address: { type: String, required: true },
    status: { type: String, default: USER_STATUS['active'] },
  },
  { timestamps: true }
);

export const UserModel = (models.Users as Model<User>) || model<User>('Users', userSchema);
