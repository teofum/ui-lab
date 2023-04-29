import cn from 'classnames';

import SoftButton from './SoftButton';
import FunkyButton from './FunkyButton';
import KeyButton from './KeyButton';

import styles from './page.module.css';

export default function ButtonsPage() {
  return (
    <div className={styles.stack}>
      <div className={cn(styles.container, styles.softContainer)}>
        <SoftButton>Click me</SoftButton>
        <SoftButton icon>i</SoftButton>
      </div>

      <div className={cn(styles.container, styles.funkyContainer)}>
        <FunkyButton>Click me!</FunkyButton>
        <FunkyButton icon>i</FunkyButton>
        <FunkyButton effectDelay={400}>I am slow</FunkyButton>
        <FunkyButton effectDelay={100}>I am really fast</FunkyButton>
      </div>

      <div className={styles.container}>
        <KeyButton>Click me</KeyButton>
        <KeyButton icon>i</KeyButton>
      </div>
    </div>
  );
}
