import cn from 'classnames';
import Heading from '@/components/Heading';

import TimePicker from './TimePicker/TimePicker';

import styles from './page.module.css';

export default function TimePickerPage() {
  return (
    <>
      <Heading
        title="Time Picker"
        text="A simple clock-looking time picker. Experiment on an intuitive, one-step time picker UI that works as well on desktop and mobile devices. AM/PM not supported yet."
      />
      <div className={styles.stack}>
        <div className={styles.container}>
          <TimePicker />
        </div>
      </div>
    </>
  );
}
