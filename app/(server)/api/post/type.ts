import { PostSchema, UserSchema } from '@/(server)/model';

export type PostRequestSearchParams = {
  page?: number;
  limit: number;
};

export type PostResponse = Omit<PostSchema, '_id' | 'userId'> & {
  _id: string;
  user: Pick<UserSchema, 'name' | 'image'> & { _id: string; isMe: boolean };
};

export type PostListResponse = PostResponse[];
