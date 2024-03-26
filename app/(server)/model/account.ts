import { Model, Schema, model, models } from 'mongoose';

import { AccountStatus, AccountType } from '@/(server)/union';
import { accountStatusValidate, accountTypeValidate } from '@/(server)/util';

export type AccountSchema = {
  _id: Schema.Types.ObjectId;
  type: AccountType;
  accountId?: string;
  status: AccountStatus;
  userId: Schema.Types.ObjectId;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export const accountSchema = new Schema<AccountSchema>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    type: { type: String, required: true, validate: accountTypeValidate },
    accountId: { type: String },
    status: { type: String, required: true, validate: accountStatusValidate },
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    refreshToken: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

export const AccountModel =
  (models.Accounts as Model<AccountSchema>) || model<AccountSchema>('Accounts', accountSchema);
