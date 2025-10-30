'use client';
import styles from './Footer.module.scss';
import Button from '../Button/Button';
import HomeIcon from '../icons/HomeIcon';
// import SearchIcon from '../icons/SearchIcon';
// import ArchivedIcon from '../icons/ArchivedIcon';
// import TagIcon from '../icons/TagIcon';
// import SettingsIcon from '../icons/SettingsIcon';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className={styles.footer}>
      <Button description='home' url='/notes'>
        <HomeIcon color={pathname === '/notes' ? '#335CFF' : '#525866'} />
      </Button>
      {/* <Button description='search' url='/search'>
        <SearchIcon color={pathname === '/search' ? '#335CFF' : '#525866'} />
      </Button>
      <Button description='archived' url='/archive'>
        <ArchivedIcon color={pathname === '/archive' ? '#335CFF' : '#525866'} />
      </Button>
      <Button description='tags' url='/tags'>
        <TagIcon color={pathname === '/tags' ? '#335CFF' : '#525866'} />
      </Button>
      <Button description='settings' url='/settings'>
        <SettingsIcon color={pathname === '/settings' ? '#335CFF' : '#525866'} />
      </Button> */}
    </footer>
  );
}
