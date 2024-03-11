import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { CLIENT_SETTINGS } from '@/settings';

const CONTENT_TYPE_KEY = 'Content-Type' as const;
const CONTENT_TYPE = ['json', 'form', 'multipart'] as const;
const DEFAULT_CONTENT_TYPE = CONTENT_TYPE[0];

const TOKEN_TYPE = ['none', 'required', 'optional'] as const;
const DEFAULT_TOKEN_TYPE = TOKEN_TYPE[0];

type ContentType = (typeof CONTENT_TYPE)[number];

type TokenType = (typeof TOKEN_TYPE)[number];

type BaseAPIRequestProps = Pick<
  AxiosRequestConfig,
  | 'baseURL'
  | 'method'
  | 'url'
  | 'params'
  | 'data'
  | 'responseType'
  | 'onDownloadProgress'
  | 'onUploadProgress'
> & { contentType?: ContentType; tokenType?: TokenType };

/**
 * NOTE: This is a base class for all API services.
 * - Default fetch API that using axios is named with `baseAPIRequest`.
 * TODO: Wrapper for using react-query is named with `baseQuery`.
 */
export async function baseAPIRequest<TData>({
  baseURL,
  url,
  contentType,
  tokenType,
  ...restProps
}: BaseAPIRequestProps) {
  try {
    const managedURL = urlManager(baseURL, url);
    const managedHeader = await headerManager(contentType, tokenType);

    return await axios<TData>({
      ...restProps,
      ...managedURL,
      headers: managedHeader,
    });
  } catch (error) {
    // NOTE: If this error is axios error, we will handle it.
    if (error instanceof AxiosError && error.isAxiosError) {
      if (error.response) {
        // TODO: Handle error response.
        throw error;
      }
    }

    // NOTE: If this error is not axios error, we will throw it.
    throw error;
  }
}

const urlManager = (baseURL?: string, url?: string) => {
  return url?.startsWith('http')
    ? { url }
    : { baseURL: baseURL ?? CLIENT_SETTINGS.BACKEND_URL, url };
};

const headerManager = async (
  contentType: ContentType = DEFAULT_CONTENT_TYPE,
  tokenType: TokenType = DEFAULT_TOKEN_TYPE
) => {
  const contentTypeHandler = () => {
    switch (contentType) {
      case 'json':
        return {
          [CONTENT_TYPE_KEY]: 'application/json',
        };
      case 'form':
        return {
          [CONTENT_TYPE_KEY]: 'application/x-www-form-urlencoded',
        };
      case 'multipart':
        return {
          [CONTENT_TYPE_KEY]: 'multipart/form-data',
        };
    }
  };

  const authorizationHandler = () => {
    if (tokenType === 'none') return {};

    // TODO: Getting token from storage.
    return {
      Authorization: `Bearer `,
    };
  };

  return {
    ...contentTypeHandler(),
    ...authorizationHandler(),
  };
};
