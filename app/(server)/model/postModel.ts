import { Model, Schema, Types, model, models } from 'mongoose';

export type PostSchema = {
  _id: Types.ObjectId;
  title: string;
  content: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const postSchema = new Schema<PostSchema>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    content: { type: String },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  },
  { timestamps: true }
);

export const PostModel =
  (models.Posts as Model<PostSchema>) || model<PostSchema>('Posts', postSchema);
