import Image from 'next/image';
import styles from './Header.module.scss';
import feather from '/public/images/logo.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <Image src={feather} alt='Header logo' />
    </header>
  );
}
