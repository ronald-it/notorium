import styles from './Sidebar.module.scss';
import Image from 'next/image';
import feather from '/public/images/logo.svg';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Image src={feather} alt='Sidebar logo' className={styles.image} />
    </div>
  );
}
