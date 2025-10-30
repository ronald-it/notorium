'use client';
import { useContext } from 'react';
import styles from './page.module.scss';
import type { Note, Notes } from '../../lib/definitions';
// import Button from '../../ui/Button/Button';
// import { Input } from '@mui/joy';
// import SearchIcon from '../../ui/icons/SearchIcon';
// import SettingsIcon from '../../ui/icons/SettingsIcon';
import ArrowLeftIcon from '../../ui/icons/ArrowLeftIcon';
import TagIcon from '../../ui/icons/TagIcon';
import ClockIcon from '../../ui/icons/ClockIcon';
// import ArchivedIcon from '../../ui/icons/ArchivedIcon';
import DeleteIcon from '../../ui/icons/DeleteIcon';
import PlusIcon from '../../ui/icons/PlusIcon';
import { NotesContext } from '../context/DataProvider';
// import ArchivedIcon from '@/app/ui/icons/ArchivedIcon';

export default function Notes() {
  const {
    data,
    isDesktop,
    handleCreateNoteClick,
    handleEditNoteClick,
    handleSubmit,
    handleDelete,
    handleChange,
    handleCancel,
    modifyMode,
    selectedNote,
    newNote,
  } = useContext(NotesContext)!;

  return (
    <main className={styles.notes}>
      <div className={styles['notes__inner-container']}>
        {!(modifyMode && !isDesktop) && (
          <div className={`${styles['notes__title-bar']}`}>
            <h2 className={styles.notes__title}>all notes</h2>
            {/* <div className={styles.notes__toolbar}>
              <Input
                className={styles.notes__searchbar}
                placeholder='Search by title, content, or tags...'
                startDecorator={<SearchIcon color='#717784' />}
                size='sm'
              />
              <Button url='/settings'>
                <SettingsIcon color='#525866' />
              </Button>
            </div> */}
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
                            if (index < 3) {
                              return (
                                <span className={`${styles['notes__note-tag']}`} key={index}>
                                  {tag}
                                </span>
                              );
                            } else if (index === note.tags.length - 1) {
                              return (
                                <span
                                  className={`${styles['notes__note-tag']} ${styles['notes__note-tag--remainder']}`}
                                  key={index}
                                >
                                  +{note.tags.length - 3}
                                </span>
                              );
                            }
                          })}
                        </div>
                        <span className={`${styles['notes__note-date']}`}>
                          {note.lastEditedDate}
                        </span>
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
                          type='button'
                          className={`${styles['notes__mobile-form-button']} ${styles['notes__mobile-form-button--gray']}`}
                          onClick={handleCancel}
                        >
                          <ArrowLeftIcon color='#525866' width='18' height='18' />
                          go back
                        </button>
                        <div className={styles['notes__actions-container']}>
                          {selectedNote && (
                            <>
                              <button
                                type='button'
                                className={`${styles['notes__mobile-form-button']}`}
                                onClick={handleDelete}
                              >
                                <DeleteIcon width='18' height='18' color='#525866' />
                              </button>
                              {/* <button type='button'>
                                <ArchivedIcon width='18' height='18' color='#525866' />
                              </button> */}
                            </>
                          )}
                          <button
                            type='button'
                            className={`${styles['notes__mobile-form-button']} ${styles['notes__mobile-form-button--gray']}`}
                            onClick={handleCancel}
                          >
                            cancel
                          </button>
                          <button
                            className={`${styles['notes__mobile-form-button']} ${styles['notes__mobile-form-button--blue']}`}
                            type='submit'
                          >
                            save note
                          </button>
                        </div>
                      </div>
                    )}
                    <label htmlFor='title' className={styles['notes__form-title']}>
                      <input
                        type='text'
                        id='title'
                        name='title'
                        value={selectedNote ? selectedNote.title : newNote.title}
                        onChange={handleChange}
                        placeholder='Enter a title...'
                        className={styles['notes__form-title']}
                      />
                    </label>
                    <div className={styles['notes__form-field-container']}>
                      <div className={styles['notes__form-field-group']}>
                        <label htmlFor='tagString' className={styles['notes__form-label']}>
                          <TagIcon color='#2B303B' width='16' height='16' />
                          Tags
                        </label>
                        <textarea
                          id='tagString'
                          name='tagString'
                          placeholder='Add tags separated by commas (e.g. Work, Planning)'
                          value={selectedNote ? selectedNote.tagString : newNote.tagString}
                          onChange={handleChange}
                          className={styles['notes__form-input']}
                          rows={1}
                        />
                      </div>
                      <div className={styles['notes__form-field-group']}>
                        <label htmlFor='lastEdited' className={styles['notes__form-label']}>
                          <ClockIcon color='#2B303B' width='16' height='16' />
                          Last edited
                        </label>
                        <input
                          id='lastEdited'
                          type='text'
                          name='lastEdited'
                          value={
                            selectedNote ? selectedNote.lastEditedDate : newNote.lastEditedDate
                          }
                          onChange={handleChange}
                          placeholder='Not yet saved'
                          className={styles['notes__form-input']}
                        />
                      </div>
                    </div>
                    <span className={styles.notes__divider}></span>
                    <label htmlFor='content' className={styles['notes__form-description-label']}>
                      <textarea
                        id='content'
                        name='content'
                        value={selectedNote ? selectedNote.content : newNote.content}
                        onChange={handleChange}
                        placeholder='Start typing your note here...'
                        className={styles['notes__form-description']}
                      />
                    </label>
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
                        type='button'
                        onClick={handleCancel}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                  <div className={styles.notes__actions}>
                    {selectedNote && (
                      <>
                        {/* <button className={styles.notes__action}>
                          <ArchivedIcon color='black' width='20' height='20' />
                          archive note
                        </button> */}
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
    </main>
  );
}
