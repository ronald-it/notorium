'use client';
import styles from './notes.module.scss';
import PlusIcon from '../ui/icons/PlusIcon';
import { useEffect, useState } from 'react';
import Button from '../ui/Button/Button';
import SettingsIcon from '../ui/icons/SettingsIcon';
import Input from '@mui/joy/Input';
import SearchIcon from '../ui/icons/SearchIcon';
import TagIcon from '../ui/icons/TagIcon';
import ClockIcon from '../ui/icons/ClockIcon';
import ArchivedIcon from '../ui/icons/ArchivedIcon';
import DeleteIcon from '../ui/icons/DeleteIcon';
import { fetchData } from '../lib/data';
import type { Note, Notes } from '../lib/definitions';

export default function Notes() {
  const [data, setData] = useState<Notes>({ notes: [] });
  const [modifyMode, toggleModifyMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const [newNote, setNewNote] = useState<Note>({
    content: '',
    isArchived: false,
    lastEdited: '',
    lastEditedDate: '',
    tags: [],
    title: '',
  });

  function handleCreateNoteClick() {
    setSelectedNote(undefined);
    if (!modifyMode) {
      toggleModifyMode(true);
    }
  }

  function handleEditNoteClick(note: Note) {
    setSelectedNote(note);
    if (!modifyMode) {
      toggleModifyMode(true);
    }
  }

  function handleSubmit() {
    setNewNote();
  }

  useEffect(() => {
    setData(fetchData());
  }, []);

  return (
    <div className={styles.notes}>
      <div className={`${styles['notes__title-bar']}`}>
        <h2 className={styles.notes__title}>all notes</h2>
        <div className={styles.notes__toolbar}>
          <Input
            className={styles.notes__searchbar}
            placeholder='Search by title, content, or tags...'
            startDecorator={<SearchIcon color='#717784' />}
            size='sm'
          />
          <Button url='/settings'>
            <SettingsIcon color='#525866' />
          </Button>
        </div>
      </div>
      <div className={styles.notes__section}>
        <div className={styles.notes__list}>
          <button className={`${styles['notes__button-desktop']}`} onClick={handleCreateNoteClick}>
            + create new note
          </button>
          {data ? (
            <>
              {data.notes.map((note: Note, index: number) => {
                return (
                  <button
                    key={index}
                    className={`${styles.notes__note} ${
                      selectedNote === note && styles['notes__note--active']
                    }`}
                    onClick={() => handleEditNoteClick(note)}
                  >
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
                  </button>
                );
              })}
            </>
          ) : (
            <div className={styles.notes__notification}>
              <span>
                You don&apos;t have any notes yet. Start a new note to capture your thoughts and
                ideas.
              </span>
            </div>
          )}
        </div>
        <div className={styles.notes__edit}>
          <form className={styles.notes__form} onSubmit={handleSubmit}>
            {modifyMode && (
              <>
                <div className={`${styles['notes__create-fields']}`}>
                  <input
                    type='text'
                    value={selectedNote ? selectedNote.title : newNote.title}
                    placeholder='Enter a title...'
                    className={styles['notes__form-title']}
                  />
                  <div className={styles['notes__form-field-container']}>
                    <label className={styles['notes__form-label']}>
                      <TagIcon color='#2B303B' width='16' height='16' />
                      Tags
                    </label>
                    <input
                      type='text'
                      placeholder='Add tags separated by commas (e.g. Work, Planning)'
                      value={selectedNote ? selectedNote.tags.join(', ') : newNote.tags}
                      className={styles['notes__form-input']}
                    />
                  </div>
                  <div className={styles['notes__form-field-container']}>
                    <label className={styles['notes__form-label']}>
                      <ClockIcon color='#2B303B' width='16' height='16' />
                      Last edited
                    </label>
                    <input
                      type='text'
                      value={selectedNote ? selectedNote.lastEditedDate : newNote.lastEditedDate}
                      placeholder='Not yet saved'
                      className={styles['notes__form-input']}
                    />
                  </div>
                  <span className={styles.notes__divider}></span>
                  <textarea
                    value={selectedNote ? selectedNote.content : newNote.content}
                    placeholder='Start typing your note here...'
                    className={styles['notes__form-description']}
                  />
                  <span className={styles.notes__divider}></span>
                  <div className={styles['notes__buttons-container']}>
                    <button
                      className={`${styles['notes__button']} ${styles['notes__button--save']}`}
                    >
                      save note
                    </button>
                    <button
                      className={`${styles['notes__button']} ${styles['notes__button--cancel']}`}
                    >
                      cancel
                    </button>
                  </div>
                </div>
                <div className={styles.notes__actions}>
                  {selectedNote && (
                    <>
                      <button className={styles.notes__action}>
                        <ArchivedIcon color='black' width='20' height='20' />
                        archive note
                      </button>
                      <button className={styles.notes__action}>
                        <DeleteIcon width='20' height='20' />
                        delete note
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <button className={`${styles['notes__button-mobile-and-tablet']}`}>
        <PlusIcon className={styles.notes__icon} />
      </button>
    </div>
  );
}
