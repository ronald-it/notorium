import { fetchData } from './data';
import { Note, Notes } from './definitions';
import _ from 'lodash';

function updateDate(note: Note) {
  const currentDate: Date | string = new Date();
  note.lastEdited = currentDate.toISOString();
}

function updateTags(note: Note) {
  if (note.tagString) {
    const tags = note.tagString.split(',');
    note.tags = tags.map((tag: string) => tag.trim());
  }
}

export function createNote(note: Note) {
  const data: Notes = fetchData();
  console.log(data);
  updateDate(note);
  updateTags(note);
  data.notes.push(note);
  console.log(note, data);
  localStorage.setItem('notes', JSON.stringify(data));
}

export function editNote(editedNote: Note, originalNote: Note) {
  let data: Notes = fetchData();
  console.log(data);
  updateDate(editedNote);
  updateTags(editedNote);
  data = {
    notes: data.notes.map((note: Note) => {
      if (_.isEqual(note, originalNote)) {
        note = editedNote;
      }
      return note;
    }),
  };
  console.log(data);
  localStorage.setItem('notes', JSON.stringify(data));
}

export function deleteNote(originalNote: Note | undefined) {
  let data: Notes = fetchData();
  data = {
    notes: data.notes.filter((note: Note) => !_.isEqual(note, originalNote)),
  };
  localStorage.setItem('notes', JSON.stringify(data));
}
