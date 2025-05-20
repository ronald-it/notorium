import styles from './dashboard.module.scss';
import PlusIcon from './components/icons/PlusIcon';

export default function Home() {
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>all notes</h2>
      <div className={styles.notification}>
        <span>
          You don&apos;t have any notes yet. Start a new note to capture your thoughts and ideas.
        </span>
      </div>
      <button className={styles.button}>
        <PlusIcon className={styles.button__image} />
      </button>
    </main>
  );
}
