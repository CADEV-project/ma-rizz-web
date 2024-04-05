import imageCompression, { Options } from 'browser-image-compression';

import { ResourceError } from '@/(error)';

/**
 * INFO: Compress image file with browser-image-compression.
 * @param imageFile - Image file to compress.
 * @param compressOptions - Options for image compression.
 * @returns Compressed image file.
 * @throws ResourceError
 * @see https://www.npmjs.com/package/browser-image-compression
 */
export const getCompressedImageFile = async (
  imageFile: File,
  compressOptions: Options
): Promise<File> => {
  try {
    return await imageCompression(imageFile, compressOptions);
  } catch (error) {
    throw new ResourceError({
      type: 'ResourceError',
      code: 400,
      detail: { type: 'IMAGE', action: 'COMPRESS' },
    });
  }
};

type GetImageFileDetailsResult = {
  name: string;
  type: string;
  size: number;
  width: number;
  height: number;
  imageElement: HTMLImageElement;
};

/**
 * NOTE: Get image file details.
 * @param imageFile - Image file to get details.
 * @returns src, width, height of image file.
 * @throws ResourceError
 * @see https://www.npmjs.com/package/browser-image-compression
 */
export const getImageFileDetails = (imageFile: File): Promise<GetImageFileDetailsResult> => {
  try {
    return new Promise((resolve, reject) => {
      imageCompression
        .getDataUrlFromFile(imageFile)
        .then(imageSrc => {
          const image = new Image();
          image.src = imageSrc;

          image.onload = () => {
            resolve({
              name: imageFile.name,
              type: imageFile.type,
              size: imageFile.size,
              imageElement: image,
              width: image.width,
              height: image.height,
            });
          };

          image.onerror = error => {
            reject(error);
          };
        })
        .catch(error => {
          reject(error);
        });
    });
  } catch (error) {
    throw new ResourceError({
      type: 'ResourceError',
      code: 400,
      detail: { type: 'IMAGE', action: 'LOAD' },
    });
  }
};
