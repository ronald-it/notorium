import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Image src='/images/logo.svg' alt='Header logo' width={100} height={100} />
    </header>
  );
}
