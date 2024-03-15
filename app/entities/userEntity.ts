import { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  password: String,
  passwordAccept: String,
  name: String,
  phoneNumber: String,
  age: String,
  gender: String,
  address: String,
});
