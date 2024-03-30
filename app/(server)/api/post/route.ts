import { NextRequest } from 'next/server';

import { PostListResponse, PostRequestSearchParams, PostResponse } from './type';

import { ErrorResponse } from '@/(server)/error';
import { getConnection, getVerifiedAccessToken } from '@/(server)/lib';
import { PostModel, UserSchema } from '@/(server)/model';
import {
  SuccessResponse,
  getRequestAccessToken,
  getRequestSearchPraramsJSON,
  isAuthorizedRequest,
  validate,
} from '@/(server)/util';

const DEFAULT_PAGE = 1;

/**
 * NOTE: /api/post
 * @optional accessToken
 * @searchParams PostRequestSearchParams
 * @return PostListResponse
 */
export const GET = async (request: NextRequest) => {
  await getConnection();

  try {
    const requestSearchParamsJSON = getRequestSearchPraramsJSON<PostRequestSearchParams>(request, [
      'limit',
    ]);

    validate({
      numbers: requestSearchParamsJSON.page
        ? [requestSearchParamsJSON.page, requestSearchParamsJSON.limit]
        : [requestSearchParamsJSON.limit],
    });

    const page = requestSearchParamsJSON.page
      ? parseInt(requestSearchParamsJSON.page)
      : DEFAULT_PAGE;
    const limit = parseInt(requestSearchParamsJSON.limit);

    const startIndex = (page || DEFAULT_PAGE) * limit - limit;

    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate<{ user: UserSchema }>('userId', 'name image')
      .lean()
      .exec();

    const isAuthorized = isAuthorizedRequest(request);

    let authorizedUserId: string | undefined = undefined;

    if (isAuthorized) {
      const accessToken = getRequestAccessToken(request);

      const { userId } = getVerifiedAccessToken(accessToken);

      authorizedUserId = userId;
    }

    const responseData = posts.map<PostResponse>(post => ({
      _id: post._id.toHexString(),
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: {
        _id: post.user._id.toHexString(),
        name: post.user.name,
        image: post.user.image,
        isMe: post.userId.toHexString() === authorizedUserId,
      },
    }));

    return SuccessResponse<PostListResponse>({ method: 'GET', data: responseData });
  } catch (error) {
    return ErrorResponse(error);
  }
};
