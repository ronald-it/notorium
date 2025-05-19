import Image from 'next/image';
import styles from './dashboard.module.scss';
import addIcon from '/public/images/icon-plus.svg'

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>The quick brown</h2>
      <span>
        You don&apos;t have any notes yet. Start a new note to capture your thoughts and ideas.
      </span>
      <button className={styles.button}>
        <Image src={addIcon} alt='Add icon'/>
      </button>
    </main>
  );
}
