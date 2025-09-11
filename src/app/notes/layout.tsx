'use client';
import styles from './notes.module.scss';
import PlusIcon from '../ui/icons/PlusIcon';
import fallbackData from '../lib/data.json';
import { useEffect, useState } from 'react';
import { Input } from '@fluentui/react-input';
import Button from '../ui/Button/Button';
import SettingsIcon from '../ui/icons/SettingsIcon';

interface Notes {
  notes: Note[];
}

interface Note {
  content: string;
  isArchived: boolean;
  lastEdited: string;
  lastEditedDate?: string;
  tags: Array<string>;
  title: string;
}

export default function Notes() {
  const [data, setData] = useState<Notes>({ notes: [] });

  function formatDates(initialData: Notes) {
    const dataWithFormattedDate = initialData.notes.map((note: Note) => {
      const lastEditedDate = new Date(note.lastEdited);
      const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      const parts = dateTimeFormat.formatToParts(lastEditedDate);
      const day = parts.filter((part) => part.type === 'day')[0]['value'];
      const month = parts.filter((part) => part.type === 'month')[0]['value'];
      const year = parts.filter((part) => part.type === 'year')[0]['value'];
      note.lastEditedDate = `${day.length < 2 ? '0' + day : day} ${month} ${year}`;
      return note;
    });

    return dataWithFormattedDate;
  }

  useEffect(() => {
    const storageData = localStorage.getItem('notes');
    if (!storageData) {
      localStorage.setItem('notes', JSON.stringify(fallbackData));
      setData({ notes: formatDates(fallbackData) });
    } else {
      setData({ notes: formatDates(JSON.parse(storageData)) });
    }
  }, []);

  return (
    <section className={styles.notes}>
      <div className={`${styles['notes__title-bar']}`}>
        <h2 className={styles.notes__title}>all notes</h2>
        <div className={`${styles.notes__toolbar}`}>
          <Input
            className={styles.notes__searchbar}
            type='search'
            id='search'
            name='search'
            placeholder='Search by title, content, or tags...'
          />
          <Button url='/settings'>
            <SettingsIcon color='#525866' />
          </Button>
        </div>
      </div>
      {data ? (
        <div className={styles.notes__list}>
          {data.notes.map((note: Note, index: number) => {
            return (
              <div key={index} className={styles.notes__note}>
                <span className={`${styles['notes__note-title']}`}>{note.title}</span>
                <div className={`${styles['notes__note-tags']}`}>
                  {note.tags.map((tag, index) => {
                    return (
                      <span className={`${styles['notes__note-tag']}`} key={index}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <span className={`${styles['notes__note-date']}`}>{note.lastEditedDate}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.notes__notification}>
          <span>
            You don&apos;t have any notes yet. Start a new note to capture your thoughts and ideas.
          </span>
        </div>
      )}
      <button className={styles.notes__button}>
        <PlusIcon className={styles.notes__icon} />
      </button>
    </section>
  );
}
