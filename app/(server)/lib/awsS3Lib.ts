import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

import { NotFound } from '@/(error)';

import { SERVER_SETTINGS } from '@/setting';

const getS3Client = () => {
  if (!SERVER_SETTINGS.AWS_ACCESS_KEY_ID)
    throw new NotFound({ type: 'NotFound', code: 404, detail: 'AWS_IAM_ACCESS_KEY' });

  if (!SERVER_SETTINGS.AWS_SECRET_ACCESS_KEY)
    throw new NotFound({ type: 'NotFound', code: 404, detail: 'AWS_IAM_SECRET_KEY' });

  if (!SERVER_SETTINGS.AWS_REGION)
    throw new NotFound({ type: 'NotFound', code: 404, detail: 'AWS_REGION' });

  return new S3Client({
    region: SERVER_SETTINGS.AWS_REGION,
    credentials: {
      accessKeyId: SERVER_SETTINGS.AWS_ACCESS_KEY_ID,
      secretAccessKey: SERVER_SETTINGS.AWS_SECRET_ACCESS_KEY,
    },
  });
};

export const uploadImageToS3 = async (file: File, targetDirectory: string) => {
  if (!SERVER_SETTINGS.AWS_BUCKET_NAME)
    throw new NotFound({ type: 'NotFound', code: 404, detail: 'AWS_BUCKET_NAME' });

  const s3Client = getS3Client();

  const randomKey = uuidv4();

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileName = `${file.name}-${randomKey}`;
  const fileExtension = file.type.split('/')[1];

  const putObjectCommand = new PutObjectCommand({
    Bucket: SERVER_SETTINGS.AWS_BUCKET_NAME,
    Key: `${targetDirectory}/${fileName}.${fileExtension}`,
    Body: buffer,
    ContentType: file.type,
    ACL: 'public-read',
  });

  await s3Client.send(putObjectCommand);

  return `https://${SERVER_SETTINGS.AWS_BUCKET_NAME}.s3.${SERVER_SETTINGS.AWS_REGION}.amazonaws.com/${targetDirectory}/${fileName}.${fileExtension}`;
};
