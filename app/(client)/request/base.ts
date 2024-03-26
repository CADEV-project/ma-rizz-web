import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { CLIENT_SETTINGS } from '@/setting';

const CONTENT_TYPE_KEY = 'Content-Type' as const;
const CONTENT_TYPE = ['json', 'form', 'multipart'] as const;
const DEFAULT_CONTENT_TYPE = CONTENT_TYPE[0];

// const AUTHORIZATION_KEY = 'Authorization' as const;
// const TOKEN_TYPE = ['none', 'required', 'optional'] as const;
// const DEFAULT_TOKEN_TYPE = TOKEN_TYPE[0];

type ContentType = (typeof CONTENT_TYPE)[number];

// type TokenType = (typeof TOKEN_TYPE)[number];

type BaseAPIRequestProps = Pick<
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

/**
 * NOTE: This is a base class for all API services.
 * - Default fetch API that using axios is named with `baseAPIRequest`.
 * TODO: Wrapper for using react-query is named with `baseQuery`.
 */
export async function baseAPIRequest<TData>({
  baseURL,
  url,
  headers,
  contentType,
  // tokenType,
  ...restProps
}: BaseAPIRequestProps) {
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
  return url?.startsWith('http') ? { url } : { baseURL: baseURL ?? CLIENT_SETTINGS.API_URL, url };
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

  // const authorizationHandler = async () => {
  //   const [clientSession, serverSession] = await Promise.all([
  //     getSession(),
  //     getServerSession(authOptions),
  //   ]);

  //   const activeSession = clientSession ?? serverSession;

  //   if (tokenType === 'none' || !activeSession || !activeSession.accessToken) return {};

  //   return {
  //     [AUTHORIZATION_KEY]: `Bearer ${activeSession.accessToken}`,
  //   };
  // };

  return {
    ...contentTypeHandler(),
    // ...(await authorizationHandler()),
  };
};
