import { NotFound } from '@/(server)/errors';

type CommonBody = Record<string, unknown>;

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
