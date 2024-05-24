'use client';

import { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

import {
  CustomSkeletonProps,
  ObjectFit,
  RelativeImg,
  RelativeNextImage,
  RelativeSkeleton,
} from './SmartImage.styles';

type StaticRequire = {
  default: StaticImageData;
};

export type StaticImport = StaticRequire | StaticImageData;

type Loading = 'eager' | 'lazy';

type SmartImageProps = {
  src?: string | StaticImport | null;
  hoverSrc?: string | StaticImport | null;
  alt: string;
  loading?: Loading;
  objectFit?: ObjectFit[];
  isCaptureBlocked?: boolean;
} & CustomSkeletonProps;

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  hoverSrc,
  alt,
  animation = 'wave',
  variant = 'rounded',
  loading = 'lazy',
  objectFit,
  isCaptureBlocked = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    setIsHovered(false);
  }, [src]);

  if (!src) {
    return <RelativeSkeleton animation={animation} variant={variant} />;
  }

  if (isStaticImport(src)) {
    return (
      <RelativeNextImage
        src={isHovered ? hoverSrc ?? src : src}
        fill
        sizes='100%'
        alt={alt}
        variant={variant}
        style={{ objectFit: objectFit?.[0] }}
        loading={loading}
        priority={loading !== 'lazy'}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onContextMenu={isCaptureBlocked ? onContextMenu : undefined}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <RelativeImg
      src={src}
      loading={loading}
      alt={alt}
      variant={variant}
      objectFit={objectFit}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onContextMenu={isCaptureBlocked ? onContextMenu : undefined}
    />
  );
};

const isStaticImport = (src: string | StaticImport): src is StaticImport =>
  (src as StaticRequire).default !== undefined || (src as StaticImageData).src !== undefined;
