import '../styles/globals.css';

import cn from 'classnames';

import Header from './Header';

import styles from './layout.module.css';
import { dmMono, dmSerifDisplay, inter } from '../styles/fonts';

export const metadata = {
  title: 'UI Lab',
  description: 'Project to test UI concepts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(inter.variable, dmMono.variable, dmSerifDisplay.variable)}
      >
        <Header />
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
