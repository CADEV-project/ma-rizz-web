export type PostUpdateRequestParams = {
  params: {
    postId: string;
  };
};

export type PostUpdateRequestBody = {
  title: string;
  content?: string;
};
