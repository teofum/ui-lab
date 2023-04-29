import Link from 'next/link';
import cn from 'classnames';

import styles from './page.module.css';
import { dmMono } from '@/styles/fonts';

const pages = [
  { name: 'Fancy Photo Cards', url: 'fancy-cards' },
  { name: 'Button Experiments', url: 'buttons' },
];

export default function Home() {
  return (
    <div className={cn(styles.main, dmMono.className)}>
      {pages.map((page) => (
        <Link key={page.url} href={page.url}>
          {page.name}
        </Link>
      ))}
    </div>
  );
}
