import { baseRequest } from '.';

import { ImageDeleteRequestSearchParams } from '@/(server)/api/image/delete/type';
import {
  ImageUploadRequestFormData,
  ImageUploadResponseBody,
} from '@/(server)/api/image/upload/type';

import { API_URL } from '@/constant';

export type ImageUploadRequestProps = {
  data: FormData;
};

export type { ImageUploadRequestFormData };

export type ImageUploadRequestReturn = ImageUploadResponseBody;

export const imageUploadRequest = async ({ data }: ImageUploadRequestProps) => {
  const response = await baseRequest<ImageUploadRequestReturn>({
    method: 'post',
    url: API_URL.image.upload,
    contentType: 'multipart',
    data,
  });

  return response.data;
};

export type ImageDeleteRequestProps = ImageDeleteRequestSearchParams;

export const imageDeleteRequest = async ({ imageURL }: ImageDeleteRequestProps) => {
  const response = await baseRequest<void>({
    method: 'delete',
    url: API_URL.image.delete,
    params: { imageURL },
  });

  return response.data;
};
