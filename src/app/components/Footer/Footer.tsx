import Image from 'next/image';
import styles from './Footer.module.scss';
import homeIcon from '/public/images/icon-home.svg';
import searchIcon from '/public/images/icon-search.svg';
import archivedIcon from '/public/images/icon-archive.svg';
import tagsIcon from '/public/images/icon-tag.svg';
import settingsIcon from '/public/images/icon-settings.svg';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <Image src={homeIcon} alt='Home icon' />
        <span>home</span>
      </div>
      <div>
        <Image src={searchIcon} alt='Search icon' />
        <span>search</span>
      </div>
      <div>
        <Image src={archivedIcon} alt='Archived icon' />
        <span>archived</span>
      </div>
      <div>
        <Image src={tagsIcon} alt='Tags icon' />
        <span>tags</span>
      </div>
      <div>
        <Image src={settingsIcon} alt='Settings icon' />
        <span>settings</span>
      </div>
    </footer>
  );
}
