import cn from 'classnames';
import Heading from '@/components/Heading';

import FlipClock from './FlipClock';

import styles from './page.module.css';

export default function TimePickerPage() {
  return (
    <>
      <Heading
        title="Flip Clock"
        text="True 3D flip clock, animated using 3D transforms. Doesn't have much purpose, other than looking cool and a satisfying animation when an hour rolls over."
      />
      <div className={styles.stack}>
        <div className={styles.container}>
          <FlipClock />
        </div>

        <div className={styles.container}>
          <FlipClock withSeconds />
        </div>
      </div>
    </>
  );
}
