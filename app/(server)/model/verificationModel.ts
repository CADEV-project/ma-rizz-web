import { Model, Schema, Types, model, models } from 'mongoose';

import { phoneNumberRegexValidate } from '@/(server)/util';

export type VerificationSchema = {
  _id: Types.ObjectId;
  phoneNumber: string;
  verificationCode: string;
  createdAt: Date;
  updatedAt: Date;
};

export const verificationSchema = new Schema<VerificationSchema>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    phoneNumber: { type: String, required: true, unique: true, validate: phoneNumberRegexValidate },
    verificationCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

export const VerificationModel =
  (models.Verifications as Model<VerificationSchema>) ||
  model<VerificationSchema>('Verifications', verificationSchema);
