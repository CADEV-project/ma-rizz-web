import { NotFound, UnprocessableEntity } from '@/(server)/errors';

type CommonRequestBody = Record<string, unknown>;

/**
 * NOTE: Check request body is valid
 * - If request body is not object or empty, return false.
 * - If request body has no key, return false.
 * - If request body has key that is not in fields, return false.
 */
export function requestBodyParser<RequestBody extends CommonRequestBody>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody: any,
  fields: (keyof RequestBody)[]
): RequestBody | undefined {
  const unprocessableEntities: string[] = [];

  if (!requestBody || typeof requestBody !== 'object' || Object.keys(requestBody).length === 0)
    throw new NotFound({});

  const requestBodyKeys = Object.keys(requestBody);

  fields.forEach(field => {
    if (typeof field !== 'string' || !requestBodyKeys.includes(field))
      unprocessableEntities.push(field as string);
  });

  if (unprocessableEntities.length > 0)
    throw new UnprocessableEntity({
      detail: unprocessableEntities.map(entity => ({ field: entity, reason: 'Invalid field.' })),
    });

  return requestBody as RequestBody;
}
