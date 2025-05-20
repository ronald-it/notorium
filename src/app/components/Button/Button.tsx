import { JSX } from 'react';
import styles from './Button.module.scss';

type ComponentProps = {
  children: JSX.Element;
  description: string;
}

export default function Button({children, description} : ComponentProps) {
  return (
    <button className={styles.button}>
      {children}
      <span className={styles.button__description}>{description}</span>
    </button>
  );
}
