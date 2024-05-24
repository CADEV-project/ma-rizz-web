import styles from './FeatureCard.module.scss';

import { SmartImage, StaticImport } from '@/(client)/components';

type FeatureCardProps = {
  image: string | StaticImport;
  titleChildren: React.ReactNode;
  descriptionChildren: React.ReactNode;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  image,
  titleChildren,
  descriptionChildren,
}) => {
  return (
    <div className={`${styles.container} clickable`}>
      {titleChildren}
      <div className={styles.featureImageWrapper}>
        <SmartImage alt={`feature-card-${image.toString()}`} src={image} />
      </div>
      <div className={styles.description}>{descriptionChildren}</div>
    </div>
  );
};
