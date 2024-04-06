'use client';

import { useMemo, useRef, useState } from 'react';
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';

import * as S from './ImageTest.styles';

import { SmartImage } from '@/(client)/component';

import { imageDeleteRequest, imageUploadRequest } from '@/(client)/request/imageRequest';

type FormProps = {
  imageURL: string;
};

export const ImageTest: React.FC = () => {
  const form = useForm<FormProps>();
  const invisibleFileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const previewImageURL = useMemo(() => imageFile && URL.createObjectURL(imageFile), [imageFile]);

  const onInvisibleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageFile(file);
  };

  const onImageSelectButtonClick = () => {
    if (!invisibleFileInputRef.current) return;

    invisibleFileInputRef.current.click();
  };

  const onSuccess = async () => {
    try {
      const formData = new FormData();

      if (!imageFile) throw new Error('Image file is not selected!');

      formData.append('image', imageFile);

      const { imageURL } = await imageUploadRequest({ data: formData });

      console.info('Image uploaded:', imageURL);
    } catch (error) {
      console.error(error);
    }
  };

  const onImageDeleteButtonClick = async () => {
    try {
      if (!previewImageURL) throw new Error('Image file is not selected!');

      if (!form.getValues().imageURL || form.getValues().imageURL === '')
        throw new Error('There is no image url');

      await imageDeleteRequest({ imageURL: form.getValues().imageURL });

      console.info('Image deleted:', previewImageURL);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Container>
      <FormContainer formContext={form} onSuccess={onSuccess}>
        <S.ImageTestFormContainer>
          <S.InvisibleFileInput
            name='image'
            type='file'
            accept='.jpg, .jpeg, .png'
            ref={invisibleFileInputRef}
            onChange={onInvisibleFileInputChange}
          />
          <S.ImagePreviewWrapper>
            <SmartImage alt='image-preview' src={previewImageURL} objectFit={['contain']} />
          </S.ImagePreviewWrapper>
          <S.ImageSelectButton type='button' onClick={onImageSelectButtonClick}>
            이미지 선택하기
          </S.ImageSelectButton>
          <S.UploadButton type='submit'>Upload</S.UploadButton>
          <TextFieldElement name='imageURL' label='Image URL' variant='outlined' fullWidth />
          <S.ImageSelectButton type='button' onClick={onImageDeleteButtonClick}>
            이미지 삭제
          </S.ImageSelectButton>
        </S.ImageTestFormContainer>
      </FormContainer>
    </S.Container>
  );
};
