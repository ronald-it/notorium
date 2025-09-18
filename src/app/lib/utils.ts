import { Notes, Note } from '../lib/definitions';

export const formatDates = (initialData: Notes) => {
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
};
