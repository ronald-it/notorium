import styles from './Footer.module.scss';
import Button from '../Button/Button';
import HomeIcon from '../icons/HomeIcon';
import SearchIcon from '../icons/SearchIcon';
import ArchivedIcon from '../icons/ArchivedIcon';
import TagIcon from '../icons/TagIcon';
import SettingsIcon from '../icons/SettingsIcon';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Button description="home">
        <HomeIcon color='#335CFF' />
      </Button>
      <Button description="search">
        <SearchIcon color='#525866' />
      </Button>
      <Button description="archived">
        <ArchivedIcon color='#525866' />
      </Button>
      <Button description="tags">
        <TagIcon color='#525866' />
      </Button>
      <Button description="settings">
        <SettingsIcon color='#525866' />
      </Button>
    </footer>
  );
}
