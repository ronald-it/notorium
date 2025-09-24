import fallbackData from '../lib/data.json';
import { Note, Notes } from '../lib/definitions';
import { formatDates, formatTagStrings } from './utils';

export function fetchData() {
  let data: Notes;

  const storageData = localStorage.getItem('notes');
  if (!storageData) {
    localStorage.setItem('notes', JSON.stringify(fallbackData));
    data = formatTagStrings(formatDates(fallbackData));
  } else {
    data = formatTagStrings(formatDates(JSON.parse(storageData)));
  }

  return data;
}

export function fetchTags() {
  const data = fetchData();
  const tags: Set<string> = new Set();

  data.notes.map((note: Note) => {
    note.tags.map((tag) => {
      tags.add(tag);
    });
  });

  return tags;
}
