import cn from 'classnames';
import Heading from '@/components/Heading';

import SoftButton from './SoftButton';
import FunkyButton from './FunkyButton';
import KeyButton from './KeyButton';

import styles from './page.module.css';

export default function ButtonsPage() {
  return (
    <>
      <Heading
        title="Buttons"
        text="A gallery of buttons with different visual styles and effects."
      />
      <div className={styles.stack}>
        <Heading
          type="h2"
          title="Soft Button"
          text="Simple button using shadows and highlights to achieve a soft, neomorphism-style raised button effect. A subtle content transform on click helps add depth."
        />
        <div className={cn(styles.container, styles.softContainer)}>
          <SoftButton>Click me</SoftButton>
          <SoftButton icon>i</SoftButton>
        </div>

        <Heading
          type="h2"
          title="Funky Button"
          text="Inspired by the UI style of Persona 5. Uses animated clip-path and blending modes to create a fast moving high contrast effect."
        />
        <div className={cn(styles.container, styles.funkyContainer)}>
          <FunkyButton>Click me!</FunkyButton>
          <FunkyButton icon>i</FunkyButton>
          <FunkyButton effectDelay={400}>I am slow</FunkyButton>
          <FunkyButton effectDelay={100}>I am really fast</FunkyButton>
        </div>

        <Heading
          type="h2"
          title="3D Button"
          text="Minimalist 3D raised button. Uses a simple transform to look like it's pressed down on click."
        />
        <div className={styles.container}>
          <KeyButton>Click me</KeyButton>
          <KeyButton icon>i</KeyButton>
        </div>
      </div>
    </>
  );
}
