'use client';

import useDrag, { isTouch } from '@/hooks/useDrag';
import { useColorPicker } from './context';

import styles from './Slider.module.css';
import { useCallback, useRef } from 'react';
import cn from 'classnames';

function hueGradient(s: number, l: number) {
  return `
    hsl(0, ${s}%, ${l}%),
    hsl(60, ${s}%, ${l}%),
    hsl(120, ${s}%, ${l}%),
    hsl(180, ${s}%, ${l}%),
    hsl(240, ${s}%, ${l}%),
    hsl(300, ${s}%, ${l}%),
    hsl(360, ${s}%, ${l}%)`;
}

interface SliderProps {
  channel: 'red' | 'green' | 'blue' | 'hue' | 'saturation' | 'lightness';

  length?: number;
  thickness?: number;
  border?: number;

  orientation?: 'horizontal' | 'vertical';
}

export default function Slider({
  channel,
  length = 144,
  thickness = 24,
  border = 2,
  orientation = 'horizontal',
}: SliderProps) {
  const { mode, color, setColor } = useColorPicker();
  const sliderRef = useRef<HTMLDivElement>(null);

  const onDrag = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      const slider = sliderRef.current;
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const startX = rect.left;
      const startY = rect.bottom;

      const { clientX, clientY } = isTouch(ev) ? ev.touches[0] : ev;
      const x = clientX - startX;
      const y = startY - clientY;

      const d = orientation === 'horizontal' ? x : y;
      let range = d / (length - thickness / 2 + border * 2);
      range = Math.max(0, Math.min(1, range));

      setColor(([rh, gs, bl]) => {
        switch (channel) {
          case 'red':
          case 'hue':
            return [range, gs, bl];
          case 'green':
          case 'saturation':
            return [rh, range, bl];
          case 'blue':
          case 'lightness':
            return [rh, gs, range];
        }
      });
    },
    [setColor, length, thickness, border, channel, orientation],
  );

  const { dragHandler, touchHandler } = useDrag(onDrag);

  if (mode === 'hsl' && ['red', 'green', 'blue'].includes(channel))
    return <div>{channel} channel is only available in RGB mode.</div>;

  if (mode === 'rgb' && ['hue', 'saturation', 'lightness'].includes(channel))
    return <div>{channel} channel is only available in HSL mode.</div>;

  let [h, s, l] = color;
  s = s * 100;
  l = l * 100;

  let [r, g, b] = color.map((c) => c * 255);

  const cssColor =
    mode === 'hsl' ? `hsl(${h}, ${s}%, ${l}%)` : `rgb(${r}, ${g}, ${b})`;

  let gradient = '';
  let position = 0;

  switch (channel) {
    case 'red':
      gradient = `rgb(0, ${g}, ${b}), rgb(255, ${g}, ${b})`;
      position = r / 255;
      break;
    case 'green':
      gradient = `rgb(${r}, 0, ${b}), rgb(${r}, 255, ${b})`;
      position = g / 255;
      break;
    case 'blue':
      gradient = `rgb(${r}, ${g}, 0), rgb(${r}, ${g}, 255)`;
      position = b / 255;
      break;
    case 'hue':
      gradient = hueGradient(s, l);
      position = h / 360;
      break;
    case 'saturation':
      gradient = `hsl(${h}, 0%, ${l}%), hsl(${h}, 100%, ${l}%)`;
      position = s / 100;
      break;
    case 'lightness':
      gradient = `hsl(${h}, ${s}%, 0%), hsl(${h}, ${s}%, 50%), hsl(${h}, ${s}%, 100%)`;
      position = l / 100;
      break;
  }
  gradient = `linear-gradient(to ${
    orientation === 'horizontal' ? 'right' : 'top'
  }, ${gradient})`;

  return (
    <div
      className={styles.root}
      style={
        {
          '--length': `${length}px`,
          '--thickness': `${thickness}px`,
          '--border': `${border}px`,
          '--color': cssColor,
          '--gradient': gradient,
          '--slider': position,
        } as any
      }
    >
      <div
        className={cn(styles.slider, {
          [styles.sliderVertical]: orientation === 'vertical',
        })}
        ref={sliderRef}
      >
        <div
          className={styles.knob}
          onMouseDown={dragHandler}
          onTouchStart={touchHandler}
        />
      </div>
    </div>
  );
}
