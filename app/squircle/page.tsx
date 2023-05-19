import Heading from '@/components/Heading';
import { Squircle, SquircleButton } from './Squircle';

import styles from './page.module.css';
import cn from 'classnames';

export default function TimePickerPage() {
  return (
    <>
      <Heading
        title="Squircle"
        text="Customizable 'squircle' shape with proper curvature continuity using the CSS mask-image property. A parametrized SVG is generated and used as a mask image."
      />
      <div className={styles.stack}>
        <div className={styles.container}>
          <div className={styles.shadow}>
            <Squircle squareness={0.25} className={styles.sample1}>
              <span>Sq</span>
            </Squircle>
          </div>
          <div className={styles.shadow}>
            <Squircle squareness={0.5} className={styles.sample1}>
              <span>Sq</span>
            </Squircle>
          </div>
          <div className={styles.shadow}>
            <Squircle squareness={0.75} className={styles.sample1}>
              <span>Sq</span>
            </Squircle>
          </div>
          <div className={styles.shadow}>
            <Squircle squareness={1} className={styles.sample1}>
              <span>Sq</span>
            </Squircle>
          </div>
        </div>

        <Heading
          type="h2"
          title="Squircle button"
          text="A button built with squircle elements at both ends, to prevent stretching the corners and keep the shape consistent between buttons of different sizes."
        />
        <div className={styles.container}>
          <button className={styles.button}>
            <Squircle squareness={0.7} className={styles.buttonLeft}>
              <Squircle squareness={0.7} />
            </Squircle>
            <Squircle squareness={0.7} className={styles.buttonRight}>
              <Squircle squareness={0.7} />
            </Squircle>
            <div className={styles.buttonContent}>Click me!</div>
          </button>

          <button className={styles.button}>
            <Squircle squareness={0.7} className={styles.buttonLeft}>
              <Squircle squareness={0.7} />
            </Squircle>
            <Squircle squareness={0.7} className={styles.buttonRight}>
              <Squircle squareness={0.7} />
            </Squircle>
            <div className={styles.buttonContent}>I have some longer text</div>
          </button>

          <button className={cn(styles.button, styles.outlined)}>
            <Squircle squareness={0.7} className={styles.buttonLeft}>
              <Squircle squareness={0.7} />
            </Squircle>
            <Squircle squareness={0.7} className={styles.buttonRight}>
              <Squircle squareness={0.7} />
            </Squircle>
            <div className={styles.buttonContent}>I am outlined</div>
          </button>
        </div>
      </div>
    </>
  );
}
