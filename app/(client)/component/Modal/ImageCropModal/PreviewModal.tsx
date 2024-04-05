'use client';

import * as S from './PreviewModal.styles';

import { SmartImage } from '@/(client)/component';

type PreviewCroppedImageModalProps = {
  open: boolean;
  croppedImageURL?: string;
} & PreviewCroppedImageModalActions;

interface PreviewCroppedImageModalActions {
  onClose: () => void;
}

export const PreviewCroppedImageModal: React.FC<PreviewCroppedImageModalProps> = ({
  open,
  croppedImageURL,
  onClose,
}) => {
  return (
    <S.ModalContainer open={open} onClose={onClose}>
      <S.ModalContent>
        <S.CroppedImageWrapper>
          <SmartImage alt='preview-cropped-image' src={croppedImageURL} />
        </S.CroppedImageWrapper>
      </S.ModalContent>
    </S.ModalContainer>
  );
};
