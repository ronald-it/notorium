'use client';
import styles from './notes.module.scss';
import PlusIcon from '../ui/icons/PlusIcon';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
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
import ArrowLeftIcon from '../ui/icons/ArrowLeftIcon';
import { createNote, deleteNote, editNote } from '../lib/actions';

export default function Notes() {
  const [data, setData] = useState<Notes>({ notes: [] });
  const [modifyMode, toggleModifyMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const [selectedNoteOriginal, setSelectedNoteOriginal] = useState<Note | undefined>();
  const [newNote, setNewNote] = useState<Note>({
    content: '',
    isArchived: false,
    lastEdited: '',
    lastEditedDate: '',
    tags: [],
    tagString: '',
    title: '',
  });
  const [isDesktop, toggleIsDesktop] = useState(false);

  function handleCreateNoteClick() {
    setSelectedNote(undefined);
    setSelectedNoteOriginal(undefined);
    if (!modifyMode) {
      toggleModifyMode(true);
    }
  }

  function handleEditNoteClick(note: Note) {
    setSelectedNote(note);
    setSelectedNoteOriginal(note);
    setNewNote({
      content: '',
      isArchived: false,
      lastEdited: '',
      lastEditedDate: '',
      tags: [],
      tagString: '',
      title: '',
    });
    if (!modifyMode) {
      toggleModifyMode(true);
    }
  }

  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (selectedNote && selectedNoteOriginal) {
      editNote(selectedNote, selectedNoteOriginal);
    } else {
      createNote(newNote);
    }
    toggleModifyMode(false);
    setData(fetchData());
  }

  function handleDelete() {
    deleteNote(selectedNoteOriginal);
    toggleModifyMode(false);
    setData(fetchData());
  }

  function handleChange(e: BaseSyntheticEvent) {
    const changedFieldName = e.target.name;
    if (selectedNote && selectedNoteOriginal) {
      setSelectedNote({ ...selectedNote, [changedFieldName]: e.target.value });
    } else {
      setNewNote({ ...newNote, [changedFieldName]: e.target.value });
    }
  }

  useEffect(() => {
    setData(fetchData());
  }, []);

  useEffect(() => {
    toggleIsDesktop(window.innerWidth >= 1440);
  }, []);

  useEffect(() => {
    function handleResize() {
      toggleIsDesktop(window.innerWidth >= 1440);
    }

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.notes}>
      {!(modifyMode && !isDesktop) && (
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
      )}
      <div className={styles.notes__section}>
        {!(modifyMode && !isDesktop) && (
          <div className={styles.notes__list}>
            <button
              className={`${styles['notes__button-desktop']}`}
              onClick={handleCreateNoteClick}
            >
              + create new note
            </button>
            {modifyMode && !selectedNote && (
              <button className={`${styles.notes__note} ${styles['notes__note--active']}`}>
                <span className={`${styles['notes__note-title']}`}>
                  {newNote.title ? newNote.title : 'Untitled Note'}
                </span>
              </button>
            )}
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
        )}
        <div className={`${styles.notes__edit} ${modifyMode && styles['notes__edit--active']}`}>
          <form className={styles.notes__form} onSubmit={handleSubmit}>
            {modifyMode && (
              <>
                <div className={`${styles['notes__create-fields']}`}>
                  {!isDesktop && (
                    <div className={styles['notes__actions-bar']}>
                      <button
                        className={`${styles['notes__mobile-form-button']} ${styles['notes__mobile-form-button--gray']}`}
                      >
                        <ArrowLeftIcon color='#525866' width='18' height='18' />
                        go back
                      </button>
                      <div className={styles['notes__actions-container']}>
                        <button
                          className={`${styles['notes__mobile-form-button']} ${styles['notes__mobile-form-button--gray']}`}
                        >
                          cancel
                        </button>
                        <button
                          className={`${styles['notes__mobile-form-button']} ${styles['notes__mobile-form-button--blue']}`}
                        >
                          save note
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    type='text'
                    name='title'
                    value={selectedNote ? selectedNote.title : newNote.title}
                    onChange={handleChange}
                    placeholder='Enter a title...'
                    className={styles['notes__form-title']}
                  />
                  <div className={styles['notes__form-field-container']}>
                    <div className={styles['notes__form-field-group']}>
                      <label className={styles['notes__form-label']}>
                        <TagIcon color='#2B303B' width='16' height='16' />
                        Tags
                      </label>
                      <textarea
                        name='tagString'
                        placeholder='Add tags separated by commas (e.g. Work, Planning)'
                        value={selectedNote ? selectedNote.tagString : newNote.tagString}
                        onChange={handleChange}
                        className={styles['notes__form-input']}
                      />
                    </div>
                    <div className={styles['notes__form-field-group']}>
                      <label className={styles['notes__form-label']}>
                        <ClockIcon color='#2B303B' width='16' height='16' />
                        Last edited
                      </label>
                      <input
                        type='text'
                        name='lastEdited'
                        value={selectedNote ? selectedNote.lastEditedDate : newNote.lastEditedDate}
                        onChange={handleChange}
                        placeholder='Not yet saved'
                        className={styles['notes__form-input']}
                      />
                    </div>
                  </div>
                  <span className={styles.notes__divider}></span>
                  <textarea
                    name='content'
                    value={selectedNote ? selectedNote.content : newNote.content}
                    onChange={handleChange}
                    placeholder='Start typing your note here...'
                    className={styles['notes__form-description']}
                  />
                  {isDesktop && <span className={styles.notes__divider}></span>}
                  <div className={styles['notes__buttons-container']}>
                    <button
                      className={`${styles['notes__button']} ${styles['notes__button--save']}`}
                      type='submit'
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
                      <button className={styles.notes__action} onClick={handleDelete}>
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
      {!modifyMode && (
        <button
          className={`${styles['notes__button-mobile-and-tablet']}`}
          onClick={handleCreateNoteClick}
        >
          <PlusIcon className={styles.notes__icon} />
        </button>
      )}
    </div>
  );
}
