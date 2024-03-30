import { NextRequest } from 'next/server';

import { PostUpdateRequestBody, PostUpdateRequestParams } from './type';

import { ErrorResponse, NotFound } from '@/(server)/error';
import { getObjectId, getVerifiedAccessToken } from '@/(server)/lib';
import { PostModel } from '@/(server)/model';
import { SuccessResponse, getRequestAccessToken, getRequestBodyJSON } from '@/(server)/util';

/**
 * NOTE: /api/post/update/[postId]
 * @required token
 * @params PostUpdateRequestParams
 * @body PostUpdateRequestBody
 * @return void
 */
export const PATCH = async (request: NextRequest, { params }: PostUpdateRequestParams) => {
  try {
    const accessToken = getRequestAccessToken(request);

    const { userId } = getVerifiedAccessToken(accessToken);

    const postId = params.postId;

    const requestBodyJSON = await getRequestBodyJSON<PostUpdateRequestBody>(request, ['title']);

    const post = await PostModel.findOne({
      _id: getObjectId(postId),
      userId: getObjectId(userId),
    }).exec();

    if (!post) throw new NotFound({ type: 'NotFound', code: 404, detail: 'post' });

    post.title = requestBodyJSON.title;
    post.content = requestBodyJSON.content ?? '';

    await post.save();

    return SuccessResponse({ method: 'PATCH' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
