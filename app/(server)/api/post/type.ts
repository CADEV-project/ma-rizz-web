import { PostSchema, UserSchema } from '@/(server)/model';

export type PostRequestSearchParams = {
  cursor: number;
  limit?: number;
};

export type PostResponse = Omit<PostSchema, '_id' | 'user'> & {
  _id: string;
  user: Pick<UserSchema, 'name' | 'email' | 'image'> & { _id: string; isMe: boolean };
};

export type PostListResponse = {
  data: PostResponse[];
  nextCursor?: number;
  prevCursor?: number;
};
