'use client';
import Footer from '../ui/Footer/Footer';
import Header from '../ui/Header/Header';
import Sidebar from '../ui/Sidebar/Sidebar';
import styles from './layout.module.scss';
import DataProvider from './context/DataProvider';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <DataProvider>
      <div className={styles.layout}>
        <Header />
        <Sidebar />
        {children}
        <Footer />
      </div>
    </DataProvider>
  );
}
