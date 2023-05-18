import Heading from '@/components/Heading';
import Squircle from './Squircle';

import styles from './page.module.css';

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
            <Squircle squareness={0.2} className={styles.sample1}>
              <span>Sq</span>
            </Squircle>
          </div>
          <div className={styles.shadow}>
            <Squircle squareness={0.5} className={styles.sample1}>
              <span>Sq</span>
            </Squircle>
          </div>
          <div className={styles.shadow}>
            <Squircle squareness={0.7} className={styles.sample1}>
              <span>Sq</span>
            </Squircle>
          </div>
          <div className={styles.shadow}>
            <Squircle squareness={1} className={styles.sample1}>
              <span>Sq</span>
            </Squircle>
          </div>
        </div>
      </div>
    </>
  );
}
