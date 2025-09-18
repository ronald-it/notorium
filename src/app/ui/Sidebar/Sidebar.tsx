'use client';
import styles from './Sidebar.module.scss';
import Image from 'next/image';
import feather from '/public/images/logo.svg';
import HomeIcon from '../icons/HomeIcon';
import { usePathname } from 'next/navigation';
import ArchivedIcon from '../icons/ArchivedIcon';
import { useEffect, useState } from 'react';
import { fetchTags } from '@/app/lib/data';
import TagIcon from '../icons/TagIcon';

export default function Sidebar() {
  const pathname = usePathname();
  const [tags, setTags] = useState<string[]>();

  useEffect(() => {
    const tagsArray = Array.from(fetchTags());
    setTags(tagsArray);
  }, []);

  return (
    <nav className={styles.sidebar}>
      <Image src={feather} alt='Sidebar logo' />
      <div className={styles['sidebar__top-items']}>
        <div
          className={`${styles.sidebar__item} ${
            pathname === '/notes' && styles['sidebar__item--active']
          }`}
        >
          <HomeIcon width='20' height='20' color={pathname === '/notes' ? '#335CFF' : '#525866'} />
          <span>all notes</span>
        </div>
        <div
          className={`${styles.sidebar__item} ${
            pathname === '/archived' && styles['sidebar__item--active']
          }`}
        >
          <ArchivedIcon
            width='20'
            height='20'
            color={pathname === '/archived' ? '#335CFF' : '#525866'}
          />
          <span>archived notes</span>
        </div>
      </div>
      <span className={styles.sidebar__divider}></span>
      <span className={styles.sidebar__tags}>tags</span>
      <div className={styles['sidebar__tags-container']}>
        {tags &&
          tags.map((tag, index) => (
            <div className={styles.sidebar__item} key={index}>
              <TagIcon color='#525866' width='20' height='20' />
              <span>{tag}</span>
            </div>
          ))}
      </div>
    </nav>
  );
}
