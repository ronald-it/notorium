import { createNote, deleteNote, editNote } from '@/app/lib/actions';
import { fetchData, fetchTags } from '@/app/lib/data';
import { Note, Notes } from '@/app/lib/definitions';
import { usePathname } from 'next/navigation';
import { BaseSyntheticEvent, createContext, useEffect, useState } from 'react';

export const NotesContext = createContext<ContextData | null>(null);

type ContextData = {
  data: Notes;
  isDesktop: boolean;
  handleCreateNoteClick: () => void;
  handleEditNoteClick: (note: Note) => void;
  handleSubmit: (e: BaseSyntheticEvent) => void;
  handleDelete: () => void;
  handleChange: (e: BaseSyntheticEvent) => void;
  handleCancel: () => void;
  modifyMode: boolean;
  selectedNote: Note | undefined;
  newNote: Note;
  pathname: string;
  tags: string[] | undefined;
};

export function DataProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
  const pathname = usePathname();
  const [tags, setTags] = useState<string[] | undefined>();

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

  useEffect(() => {
    const tagsArray = Array.from(fetchTags());
    setTags(tagsArray);
  }, [data]);

  const noteData: ContextData = {
    data: data,
    isDesktop: isDesktop,
    handleCreateNoteClick: handleCreateNoteClick,
    handleEditNoteClick: handleEditNoteClick,
    handleSubmit: handleSubmit,
    handleDelete: handleDelete,
    handleChange: handleChange,
    handleCancel: handleCancel,
    modifyMode: modifyMode,
    selectedNote: selectedNote,
    newNote: newNote,
    pathname: pathname,
    tags: tags,
  };

  return <NotesContext.Provider value={noteData}>{children}</NotesContext.Provider>;
}

export default DataProvider;
