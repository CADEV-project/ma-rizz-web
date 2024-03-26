import NextImage from 'next/image';

import { Skeleton, SkeletonProps, styled } from '@mui/material';

export const RelativeSkeleton = styled(Skeleton)({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100% !important',
  height: '100% !important',
});

export type CustomSkeletonProps = Pick<SkeletonProps, 'animation' | 'variant'>;

export type ObjectFit = 'contain' | 'cover' | 'fill';

export const RelativeNextImage = styled(NextImage)<{
  variant: CustomSkeletonProps['variant'];
}>(({ variant }) => ({
  borderRadius: variant === 'circular' ? '50%' : '0',
}));

export const RelativeImg = styled('img')<{
  objectFit?: ObjectFit[];
  variant: CustomSkeletonProps['variant'];
}>(({ objectFit, variant }) => ({
  width: '100% !important',
  height: '100% !important',
  borderRadius: variant === 'circular' ? '50%' : '0',
  objectFit: objectFit,
}));
