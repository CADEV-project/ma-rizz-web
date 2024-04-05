'use client';

import { useEffect, useRef, useState } from 'react';
import { ReactCrop, Crop } from 'react-image-crop';

import { useSnackbar } from 'notistack';

import { PreviewCroppedImageModal } from './PreviewModal';
import * as S from './styles';

import { SmartImage } from '@/(client)/component';
import { getImageFileDetails } from '@/(client)/util';

import { ResourceError, isResourceError } from '@/(error)';

import 'react-image-crop/dist/ReactCrop.css';

const ORIGINAL_IMAGE_WRAPPER_SIZE = 600 as const;

type OriginalImageProps = {
  name: string;
  type: string;
  size: number;
  width: number;
  height: number;
  imageElement: HTMLImageElement;
};

type CroppedImageProps = {
  blob: Blob | null;
  imageURL: string;
};

type ImageCropModalProps = {
  open: boolean;
  originalImageFile?: File;
} & ImageCropModalActions;

interface ImageCropModalActions {
  onClose: () => void;
  onImageCropped: (blob: Blob, imageURL: string) => void;
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  open,
  originalImageFile,
  onClose,
  onImageCropped,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  /** NOTE: Original Image */
  const [originalImage, setOriginalImage] = useState<OriginalImageProps>();

  /** NOTE: React-crop. */
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<CroppedImageProps>();

  /** NOTE: Canvas */
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** NOTE: Preview */
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  /** NOTE: Initialize (image file to HTMLImageElement) */
  useEffect(() => {
    if (open && originalImageFile) {
      loadImage(originalImageFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, originalImageFile]);

  /** NOTE: Reset states on modal close. */
  useEffect(() => {
    if (!open) {
      setOriginalImage(undefined);
      setCrop(undefined);
      setCroppedImage(undefined);
    }
  }, [open]);

  /** NOTE: Create cropped results(Blob, HTMLImageElement) when original image or crop option has changed. */
  useEffect(() => {
    if (!!originalImage && !!crop) getCroppedResults(crop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalImage, crop]);

  /**
   * NOTE: Loading file(blob) to HTMLImageELement and name of file.
   * - Set React-Crop maximum width and height.
   * - Set React-Crop initial crop.
   * - Set original image.
   */
  const loadImage = async (imageFile: File) => {
    try {
      const { name, type, size, width, height, imageElement } =
        await getImageFileDetails(imageFile);

      const imageWidth =
        width > height
          ? ORIGINAL_IMAGE_WRAPPER_SIZE
          : (ORIGINAL_IMAGE_WRAPPER_SIZE / height) * width;
      const imageHeight =
        height > width
          ? ORIGINAL_IMAGE_WRAPPER_SIZE
          : (ORIGINAL_IMAGE_WRAPPER_SIZE / width) * height;

      setCrop({
        unit: 'px',
        x: 0,
        y: 0,
        width: imageWidth,
        height: imageWidth,
      });

      setOriginalImage(prev => {
        if (prev && prev.name === imageFile.name && prev.type === imageFile.type) return prev;

        return {
          name,
          type,
          size,
          width: imageWidth,
          height: imageHeight,
          imageElement,
        };
      });
    } catch (error) {
      if (isResourceError(error)) {
        enqueueSnackbar('이미지 로딩에 실패하였습니다.', { variant: 'error' });
      }

      onClose();
    }
  };

  /**
   * NOTE: Get cropped results.
   * - Set cropped image URL.
   * - Set cropped image blob.
   */
  const getCroppedResults = (crop: Crop) => {
    try {
      if (!originalImage || !canvasRef.current) throw new Error();

      const canvas2DContext = canvasRef.current.getContext('2d');

      if (!canvas2DContext) throw new Error('Unexpected exception(Type B).');

      const scaleX = originalImage.imageElement.width / originalImage.width;
      const scaleY = originalImage.imageElement.height / originalImage.height;
      const pixelRatio = window.devicePixelRatio;

      canvasRef.current.width = crop.width * pixelRatio;
      canvasRef.current.height = crop.height * pixelRatio;

      canvas2DContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      canvas2DContext.imageSmoothingQuality = 'high';

      canvas2DContext.drawImage(
        originalImage.imageElement,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const croppedImageURL = canvasRef.current
        .toDataURL(originalImage.type, 0.95)
        .replace(originalImage.type, 'image/octet-stream');

      canvasRef.current.toBlob(
        blob => {
          setCroppedImage({ imageURL: croppedImageURL, blob: blob });
        },
        originalImage.type,
        0.95
      );

      canvas2DContext.clearRect(0, 0, crop.width, crop.height);
    } catch (error) {
      throw new ResourceError({
        type: 'ResourceError',
        code: 400,
        detail: { type: 'IMAGE', action: 'CROP' },
      });
    }
  };

  const onPreviewButtonClick = () => {
    if (!croppedImage) {
      return enqueueSnackbar('미리보기 할 이미지가 없습니다.', { variant: 'error' });
    }

    setPreviewModalOpen(true);
  };

  const onApplyButtonClick = () => {
    if (!croppedImage || !croppedImage.blob) {
      return enqueueSnackbar('적용할 이미지가 없습니다.', { variant: 'error' });
    }

    onImageCropped(croppedImage.blob, croppedImage.imageURL);

    onClose();
  };

  return (
    <S.ModalContainer open={open} onClose={onClose}>
      <S.ModalContent>
        <ReactCrop crop={crop} aspect={1} maxWidth={originalImage?.width} onChange={setCrop}>
          <S.OriginalImageWrapper
            width={originalImage?.width ?? ORIGINAL_IMAGE_WRAPPER_SIZE}
            height={originalImage?.height ?? ORIGINAL_IMAGE_WRAPPER_SIZE}>
            <SmartImage
              alt='image-crop-modal-original-image-container'
              src={originalImage?.imageElement.src}
              objectFit={['contain']}
            />
          </S.OriginalImageWrapper>
        </ReactCrop>
        <S.ImageCropModalButtonContainer>
          <S.PreviewButton onClick={onPreviewButtonClick}>미리보기</S.PreviewButton>
          <S.ApplyButton onClick={onApplyButtonClick}>적용하기</S.ApplyButton>
        </S.ImageCropModalButtonContainer>
        <S.InvisibleCanvas ref={canvasRef} />
        <PreviewCroppedImageModal
          open={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          croppedImageURL={croppedImage?.imageURL}
        />
      </S.ModalContent>
    </S.ModalContainer>
  );
};
