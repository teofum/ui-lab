import Link from 'next/link';
import cn from 'classnames';

import styles from './page.module.css';
import Heading from '@/components/Heading';

const pages = [
  { name: 'Fancy Photo Cards', url: 'fancy-cards' },
  { name: 'Button Experiments', url: 'buttons' },
  { name: 'Time Picker', url: 'time-picker' },
  { name: 'Flip Clock', url: 'flip-clock' },
  { name: 'Color Picker', url: 'color-picker' },
];

export default function Home() {
  return (
    <div>
      <Heading
        title="UI Lab"
        text="This site is a simple project set up to experiment with various bits and pieces of UI."
      />

      <div className={styles.linkStack}>
        {pages.map((page) => (
          <Link key={page.url} href={page.url}>
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
