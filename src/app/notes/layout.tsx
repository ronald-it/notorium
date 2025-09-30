'use client';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import Footer from '../ui/Footer/Footer';
import Header from '../ui/Header/Header';
import Sidebar from '../ui/Sidebar/Sidebar';
import styles from './layout.module.scss';
import type { Note, Notes } from '../lib/definitions';
import RegularNotes from './page';
import { fetchData } from '../lib/data';
import { createNote, deleteNote, editNote } from '../lib/actions';

export default function Layout() {
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

  function handleCancel() {
    toggleModifyMode(false);

    if (selectedNote && selectedNoteOriginal) {
      setSelectedNote(undefined);
      setSelectedNoteOriginal(undefined);
    } else {
      setNewNote({
        content: '',
        isArchived: false,
        lastEdited: '',
        lastEditedDate: '',
        tags: [],
        tagString: '',
        title: '',
      });
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
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <RegularNotes
          data={data}
          modifyMode={modifyMode}
          selectedNote={selectedNote}
          newNote={newNote}
          isDesktop={isDesktop}
          handleCreateNoteClick={handleCreateNoteClick}
          handleEditNoteClick={handleEditNoteClick}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      </main>
      <Sidebar />
      <Footer />
    </div>
  );
}
