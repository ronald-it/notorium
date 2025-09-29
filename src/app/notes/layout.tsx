import Footer from '../ui/Footer/Footer';
import Header from '../ui/Header/Header';
import Sidebar from '../ui/Sidebar/Sidebar';
import styles from './layout.module.scss';

export default function Notes({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Sidebar />
      <Footer />
    </div>
  );
}
