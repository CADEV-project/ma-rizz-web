import { PostSchema, UserSchema } from '@/(server)/model';

export type PostDetailRequestParams = {
  params: {
    postId: string;
  };
};

export type PostDetailResponse = Omit<PostSchema, '_id' | 'userId'> & {
  _id: string;
  user: Pick<UserSchema, 'name' | 'email' | 'image' | 'createdAt' | 'updatedAt'> & {
    _id: string;
    isMe: boolean;
  };
};
