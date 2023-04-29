import Link from 'next/link';
import cn from 'classnames';

import styles from './Header.module.css';
import { dmMono } from '../styles/fonts';

export default function Header() {
  return (
    <header className={cn(styles.header, dmMono.className)}>
      <Link href="/">UI Lab</Link>
    </header>
  );
}
