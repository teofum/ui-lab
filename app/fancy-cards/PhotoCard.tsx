import Image from 'next/image';
import cn from 'classnames';

import styles from './PhotoCard.module.css';
import { dmSerifDisplay, dmMono } from '@/styles/fonts';

interface PhotoCardProps {
  src: React.ComponentProps<typeof Image>['src'];
  alt: string;

  title: string;
  description?: string;
  highlight?: string;
  action?: string;

  width?: number;

  children?: React.ReactNode;
}

export default function PhotoCard({
  src,
  alt,
  title,
  description,
  action,
  highlight,
  width = 320,
  children,
}: PhotoCardProps) {
  const sizes = `${width}px`;

  return (
    <div className={styles.card}>
      <Image className={styles.bgImage} src={src} alt={alt} sizes={sizes} />

      <div className={styles.cardContent} style={{ width }}>
        {highlight && (
          <p className={cn(styles.highlight, dmMono.className)}>{highlight}</p>
        )}

        <div className={styles.imageContainer}>
          <Image className={styles.image} src={src} alt={alt} sizes={sizes} />
        </div>

        <p className={cn(styles.title, dmSerifDisplay.className)}>{title}</p>

        {description && (
          <p className={cn(styles.description, dmMono.className)}>
            {description}
          </p>
        )}

        {action && (
          <p className={cn(styles.action, dmMono.className)}>
            {action}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}
