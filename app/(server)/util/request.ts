import { NotFound, Unauthorized } from '@/(server)/error';

type CommonBody = Record<string, unknown>;

export function tokenParser(token?: string | null): string {
  if (!token || typeof token !== 'string' || !token.startsWith('Bearer '))
    throw new Unauthorized({ type: 'Unauthorized', code: 401 });

  return token.slice(7);
}

/**
 * NOTE: Check request body is valid
 * - If request body is not object or empty, return false.
 * - If request body has no key, return false.
 * - If request body has key that is not in fields, return false.
 */
export function bodyParser<Body extends CommonBody>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any,
  fields: (keyof Body)[]
): Body {
  const notFoundFields: string[] = [];

  if (!body || typeof body !== 'object' || Object.keys(body).length === 0)
    throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['body'] } });

  const requestBodyKeys = Object.keys(body);

  fields.forEach(field => {
    if (typeof field !== 'string' || !requestBodyKeys.includes(field))
      notFoundFields.push(field as string);
  });

  if (notFoundFields.length > 0)
    throw new NotFound({
      type: 'NotFound',
      code: 404,
      detail: { fields: notFoundFields },
    });

  return body as Body;
}

type CommonSearchParams = Record<string, unknown>;

type SearchParamsParserReturn<T extends CommonSearchParams> = { [K in keyof T]: string };

export function searchParamsParser<SearchParams extends CommonSearchParams>(
  searchParams: URLSearchParams,
  fields: (keyof SearchParams)[]
): SearchParamsParserReturn<SearchParams> {
  const notFoundFields: string[] = [];

  if (!searchParams || searchParams.toString().length === 0)
    throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['searchParams'] } });

  const searchParamsKeys = Array.from(searchParams.keys());
  const searchParamsObject: Record<string, string> = {};

  fields.forEach(field => {
    if (typeof field !== 'string' || !searchParamsKeys.includes(field))
      return notFoundFields.push(field as string);

    searchParamsObject[field as string] = searchParams.get(field as string) as string;
  });

  if (notFoundFields.length > 0)
    throw new NotFound({
      type: 'NotFound',
      code: 404,
      detail: { fields: notFoundFields },
    });

  return searchParamsObject as SearchParamsParserReturn<SearchParams>;
}
