import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { CLIENT_SETTINGS } from '@/setting';

const CONTENT_TYPE_KEY = 'Content-Type' as const;
const CONTENT_TYPE = ['json', 'form', 'multipart'] as const;
const DEFAULT_CONTENT_TYPE = CONTENT_TYPE[0];

type ContentType = (typeof CONTENT_TYPE)[number];

type ClientAPIRequestProps = Pick<
  AxiosRequestConfig,
  | 'baseURL'
  | 'method'
  | 'headers'
  | 'url'
  | 'params'
  | 'data'
  | 'responseType'
  | 'onDownloadProgress'
  | 'onUploadProgress'
> & { contentType?: ContentType };

/** NOTE: Used in RCC. */
export async function clientAPIRequest<TData>({
  baseURL,
  url,
  headers,
  contentType,
  ...restProps
}: ClientAPIRequestProps) {
  try {
    const managedURL = urlManager(baseURL, url);
    const managedHeader = headerManager(contentType);

    return await axios<TData>({
      ...restProps,
      ...managedURL,
      headers: {
        ...headers,
        ...managedHeader,
      },
    });
  } catch (error) {
    if (error instanceof AxiosError && error.isAxiosError) {
      if (error.response) {
        throw error.response.data;
      }
    }

    throw error;
  }
}

const urlManager = (baseURL?: string, url?: string) => {
  return url?.startsWith('http')
    ? { url }
    : { baseURL: baseURL ?? `${CLIENT_SETTINGS.DOMAIN}${CLIENT_SETTINGS.API_PREFIX}`, url };
};

const headerManager = (
  contentType: ContentType = DEFAULT_CONTENT_TYPE
  // tokenType: TokenType = DEFAULT_TOKEN_TYPE
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
      default:
        return {
          [CONTENT_TYPE_KEY]: 'application/json',
        };
    }
  };

  return {
    ...contentTypeHandler(),
  };
};
