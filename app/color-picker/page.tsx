import cn from 'classnames';
import Heading from '@/components/Heading';

import styles from './page.module.css';
import ColorPicker from './ColorPicker';

export default function TimePickerPage() {
  return (
    <>
      <Heading
        title="Color Picker"
        text="Modular color picker system using React context. Lets the user build pickers with any layout and combination of controls. Works in either RGB or HSL mode."
      />
      <div className={styles.stack}>
        <div className={styles.container}>
          <ColorPicker.Root mode="hsl">
            <div className={styles.picker1}>
              <ColorPicker.HueRing radius={60} />
              <ColorPicker.Slider channel="saturation" />
              <ColorPicker.Slider channel="lightness" />
            </div>
          </ColorPicker.Root>
        </div>

        <div className={styles.container}>
          <ColorPicker.Root mode="rgb">
            <div className={styles.picker2}>
              <ColorPicker.Slider orientation="vertical" channel="red" />
              <ColorPicker.Slider orientation="vertical" channel="green" />
              <ColorPicker.Slider orientation="vertical" channel="blue" />
            </div>
          </ColorPicker.Root>
        </div>

        <div className={styles.container}>
          <ColorPicker.Root mode="hsl">
            <div className={styles.picker2}>
              <ColorPicker.Slider orientation="vertical" channel="hue" />
              <ColorPicker.Rectangle
                channelX="saturation"
                channelY="lightness"
              />
            </div>
          </ColorPicker.Root>
        </div>

        <div className={styles.container}>
          <ColorPicker.Root mode="hsl">
            <div className={styles.picker2}>
              <ColorPicker.Slider orientation="vertical" channel="lightness" />
              <ColorPicker.Rectangle
                channelX="hue"
                channelY="saturation"
              />
            </div>
          </ColorPicker.Root>
        </div>

        <div className={styles.container}>
          <ColorPicker.Root mode="rgb">
            <div className={styles.picker2}>
              <ColorPicker.Slider orientation="vertical" channel="red" />
              <ColorPicker.Rectangle channelX="green" channelY="blue" />
            </div>
          </ColorPicker.Root>
        </div>
      </div>
    </>
  );
}
