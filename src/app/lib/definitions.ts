import { BaseSyntheticEvent } from 'react';

export type Notes = {
  notes: Note[];
};

export type Note = {
  title: string;
  tags: Array<string>;
  content: string;
  lastEdited: string;
  isArchived: boolean;
  lastEditedDate?: string;
  tagString?: string;
};

export type NoteData = {
  data: Notes;
  modifyMode: boolean;
  selectedNote: Note | undefined;
  newNote: Note;
  isDesktop: boolean;
  handleCreateNoteClick: () => void;
  handleEditNoteClick: (note: Note) => void;
  handleSubmit: (e: BaseSyntheticEvent) => void;
  handleCancel: () => void;
  handleChange: (e: BaseSyntheticEvent) => void;
  handleDelete: () => void;
};
