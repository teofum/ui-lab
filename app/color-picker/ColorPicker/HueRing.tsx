'use client';

import useDrag, { isTouch } from '@/hooks/useDrag';
import { useColorPicker } from './context';

import styles from './HueRing.module.css';
import { useCallback, useRef } from 'react';

interface HueRingProps {
  radius?: number;
  innerRadius?: number;
  border?: number;
}

export default function HueRing({
  radius = 72,
  innerRadius = 12,
  border = 2,
}: HueRingProps) {
  const { mode, color, setColor } = useColorPicker();
  const ringRef = useRef<HTMLDivElement>(null);

  const onDrag = useCallback((ev: MouseEvent | TouchEvent) => {
    const ring = ringRef.current;
    if (!ring) return;

    const rect = ring.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const { clientX, clientY } = isTouch(ev) ? ev.touches[0] : ev;
    const x = clientX - centerX;
    const y = clientY - centerY;

    const angle = Math.atan2(y, x);
    const hue = angle / Math.PI * 180 + 90;
    setColor(([_, s, l]) => [hue, s, l]);
  }, [setColor]);

  const { dragHandler, touchHandler } = useDrag(onDrag);

  if (mode !== 'hsl') return <div>HueRing requires HSL mode.</div>;

  const saturation = `${color[1] * 100}%`;
  const lightness = `${color[2] * 100}%`;

  return (
    <div
      className={styles.root}
      style={
        {
          '--radius': `${radius}px`,
          '--radius-inner': `${innerRadius}px`,
          '--border': `${border}px`,
          '--hue': color[0],
          '--saturation': saturation,
          '--lightness': lightness,
        } as any
      }
    >
      <div className={styles.ring} ref={ringRef}>
        <div
          className={styles.knob}
          onMouseDown={dragHandler}
          onTouchStart={touchHandler}
        />
      </div>
    </div>
  );
}
