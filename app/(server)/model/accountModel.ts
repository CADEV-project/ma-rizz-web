import { Model, Schema, Types, model, models } from 'mongoose';

import { AccountStatus, AccountType } from '@/(server)/union';
import { accountStatusRegexValidate, accountTypeRegexValidate } from '@/(server)/util';

export type AccountSchema = {
  _id: Types.ObjectId;
  type: AccountType;
  productAccountId?: string;
  status: AccountStatus;
  userId: Types.ObjectId;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export const accountSchema = new Schema<AccountSchema>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    type: { type: String, required: true, validate: accountTypeRegexValidate },
    productAccountId: { type: String },
    status: { type: String, required: true, validate: accountStatusRegexValidate },
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    refreshToken: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

export const AccountModel =
  (models.Accounts as Model<AccountSchema>) || model<AccountSchema>('Accounts', accountSchema);
