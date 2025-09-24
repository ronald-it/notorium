import { fetchData } from './data';
import { Note, Notes } from './definitions';

export function saveNote(note: Note) {
  const data: Notes = fetchData();
  const currentDate: Date | string = new Date();
  note.lastEdited = currentDate.toISOString();
  if (note.tagString) {
    const tags = note.tagString.split(',');
    note.tags = tags.map((tag: string) => tag.trim());
  }
  data.notes.push(note);
  localStorage.setItem('notes', JSON.stringify(data));
}
