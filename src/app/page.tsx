import styles from './dashboard.module.scss';
import PlusIcon from './components/icons/PlusIcon';
import { promises as fs } from 'fs';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/app/data.json', 'utf8');
  let data = JSON.parse(file);
  if (data) {
    data = data?.notes?.map((note: Note) => {
      note.lastEdited = new Date(note.lastEdited);
      const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      const parts = dateTimeFormat.formatToParts(note.lastEdited);
      const day = parts.filter((part) => part.type === 'day')[0]['value'];
      const month = parts.filter((part) => part.type === 'month')[0]['value'];
      const year = parts.filter((part) => part.type === 'year')[0]['value'];
      note.lastEditedDate = '';
      note.lastEditedDate = `${day.length < 2 ? '0' + day : day} ${month} ${year}`;
      return note;
    });
  }

  interface Note {
    content: string;
    isArchived: boolean;
    lastEdited: Date;
    lastEditedDate: string;
    tags: Array<string>;
    title: string;
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>all notes</h2>
      {data ? (
        <div className={styles.notes}>
          {data?.map((note: Note, index: number) => {
            return (
              <div key={index} className={styles.note}>
                <span className={styles.note__title}>{note.title}</span>
                <div className={styles.note__tags}>
                  {note.tags.map((tag, index) => {
                    return (
                      <span className={styles.note__tag} key={index}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <span className={styles.note__date}>{note.lastEditedDate}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.notification}>
          <span>
            You don&apos;t have any notes yet. Start a new note to capture your thoughts and ideas.
          </span>
        </div>
      )}
      <button className={styles.button}>
        <PlusIcon className={styles.button__image} />
      </button>
    </main>
  );
}
