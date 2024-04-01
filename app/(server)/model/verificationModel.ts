import { Model, Schema, Types, model, models } from 'mongoose';

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
    phoneNumber: { type: String, required: true },
    verificationCode: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

export const VerificationModel =
  (models.Verifications as Model<VerificationSchema>) ||
  model<VerificationSchema>('Verifications', verificationSchema);
