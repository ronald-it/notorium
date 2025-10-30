'use client';
import { JSX } from 'react';
import styles from './Button.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ComponentProps = {
  children: JSX.Element;
  description?: string;
  url: string;
};

export default function NavLink({ children, description, url }: ComponentProps) {
  const pathname = usePathname();

  return (
    <Link
      href={url}
      className={`${styles['nav-link']} ${pathname === url && styles['nav-link--active']}`}
    >
      {children}
      {description && (
        <span
          className={`${styles['nav-link__description']} ${
            pathname === url && styles['nav-link__description--active']
          }`}
        >
          {description}
        </span>
      )}
    </Link>
  );
}
