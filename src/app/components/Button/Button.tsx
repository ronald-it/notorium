'use client';
import { JSX } from 'react';
import styles from './Button.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ComponentProps = {
  children: JSX.Element;
  description: string;
  url: string;
};

export default function Button({ children, description, url }: ComponentProps) {
  const pathname = usePathname();

  return (
    <Link href={url} className={`${styles.button} ${pathname === url && styles['button--active']}`}>
      {children}
      <span className={styles.button__description}>{description}</span>
    </Link>
  );
}
