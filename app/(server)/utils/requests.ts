import { NotFound, ValidationFailed } from '@/(server)/errors';

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
  const validationFailedEntities: { field: string; reason: string }[] = [];

  if (!requestBody || typeof requestBody !== 'object' || Object.keys(requestBody).length === 0)
    throw new NotFound({ type: 'NotFound', code: 404 });

  const requestBodyKeys = Object.keys(requestBody);

  fields.forEach(field => {
    if (typeof field !== 'string' || !requestBodyKeys.includes(field))
      validationFailedEntities.push({ field: field as string, reason: 'required' });
  });

  if (validationFailedEntities.length > 0)
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: validationFailedEntities,
    });

  return requestBody as RequestBody;
}
