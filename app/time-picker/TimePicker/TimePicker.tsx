'use client';

import { useRef, useState } from 'react';
import cn from 'classnames';

import styles from './TimePicker.module.css';
import { dmSerifDisplay } from '@/styles/fonts';

const ticks = Array.from(Array<number>(60), (_, i) => i);

interface TimePickerProps {
  size?: number;
}

export default function TimePicker({ size = 200 }: TimePickerProps) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const clockRef = useRef<HTMLDivElement>(null);

  const drag = (ev: MouseEvent, unit: 'h' | 'm') => {
    if (ev.button !== 0) return;

    // While dragging, move the element directly via DOM
    const dragging = (ev: MouseEvent) => {
      const clock = clockRef.current;
      if (!clock) return;

      const rect = clock.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = ev.clientX - centerX;
      const dy = ev.clientY - centerY;
      const angle = Math.atan2(dy, dx);

      if (unit === 'h') {
        let newHour = (angle / Math.PI) * 6 + 3;
        if (newHour < 0) newHour += 12;

        setHour(newHour);
      } else {
        let newMinute = (angle / Math.PI) * 30 + 15;
        if (newMinute < 0) newMinute += 60;

        setMinute(newMinute);
      }
    };

    // At the end of a drag event (release)...
    const dragEnd = (ev: MouseEvent) => {
      if (ev.button !== 0) return;

      if (unit === 'h') {
        setTimeout(() => setHour((hour) => Math.floor(hour)), 10);
      } else {
        setTimeout(() => setMinute((minute) => Math.floor(minute)), 10);
      }

      // Clean up event listeners
      window.removeEventListener('mousemove', dragging);
      window.removeEventListener('mouseup', dragEnd);
    };

    window.addEventListener('mousemove', dragging); // Drag while moving with mouse down
    window.addEventListener('mouseup', dragEnd); // End drag on mouse up
  };

  const dragHandler = (onstart: (ev: MouseEvent) => void, ev?: MouseEvent) => {
    if (ev && ev.button !== 0) return;

    const start = (ev: MouseEvent) => {
      onstart(ev);
      cancel();
    };

    // Clean up event listeners
    const cancel = () => {
      window.removeEventListener('mousemove', start);
      window.removeEventListener('mouseup', cancel);
    };

    // On mouse down...
    window.addEventListener('mousemove', start); // Start dragging on move
    window.addEventListener('mouseup', cancel); // Cancel on mouse up (click)
  };

  const touch = (unit: 'h' | 'm') => {
    // While dragging, move the element directly via DOM
    const dragging = (ev: TouchEvent) => {
      ev.stopPropagation();
      ev.preventDefault();

      const clock = clockRef.current;
      if (!clock) return;

      const rect = clock.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = ev.touches[0].clientX - centerX;
      const dy = ev.touches[0].clientY - centerY;
      const angle = Math.atan2(dy, dx);

      if (unit === 'h') {
        let newHour = (angle / Math.PI) * 6 + 3;
        if (newHour < 0) newHour += 12;

        setHour(newHour);
      } else {
        let newMinute = (angle / Math.PI) * 30 + 15;
        if (newMinute < 0) newMinute += 60;

        setMinute(newMinute);
      }
    };

    // At the end of a drag event (release)...
    const touchEnd = () => {
      if (unit === 'h') {
        setTimeout(() => setHour((hour) => Math.floor(hour)), 10);
      } else {
        setTimeout(() => setMinute((minute) => Math.floor(minute)), 10);
      }

      // Clean up event listeners
      window.removeEventListener('touchmove', dragging);
      window.removeEventListener('touchend', touchEnd);
    };

    window.addEventListener('touchmove', dragging); // Drag while moving with mouse down
    window.addEventListener('touchend', touchEnd); // End drag on mouse up
  };

  const touchHandler = (onstart: (ev: TouchEvent) => void, ev?: TouchEvent) => {
    const start = (ev: TouchEvent) => {
      onstart(ev);
      cancel();
    };

    // Clean up event listeners
    const cancel = () => {
      window.removeEventListener('touchmove', start);
      window.removeEventListener('touchend', cancel);
    };

    // On mouse down...
    window.addEventListener('touchmove', start); // Start dragging on move
    window.addEventListener('touchend', cancel); // Cancel on mouse up (click)
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.clock}
        style={{ '--size': `${size}px` } as any}
        ref={clockRef}
      >
        {ticks.map((minute) => (
          <div
            key={minute}
            className={cn(styles.tick, {
              [styles.hourTick]: minute % 5 === 0,
            })}
            style={{ '--angle': `${minute * 6}deg` } as any}
          />
        ))}

        <div
          className={cn(styles.hand, styles.minuteHand)}
          style={{ '--angle': minute * 6 } as any}
        >
          <div
            className={styles.indicator}
            onMouseDown={(e) =>
              dragHandler(() => drag(e.nativeEvent, 'm'), e.nativeEvent)
            }
            onTouchStart={(e) => touchHandler(() => touch('m'), e.nativeEvent)}
            style={{ '--angle': minute > 15 && minute < 45 ? 1 : 0 } as any}
          >
            <span className={styles.indicatorText}>
              {Math.floor(minute).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <div
          className={cn(styles.hand, styles.hourHand)}
          style={{ '--angle': hour * 30 } as any}
        >
          <div
            className={styles.indicator}
            onMouseDown={(e) =>
              dragHandler(() => drag(e.nativeEvent, 'h'), e.nativeEvent)
            }
            onTouchStart={(e) => touchHandler(() => touch('h'), e.nativeEvent)}
            style={{ '--angle': hour > 3 && hour < 9 ? 1 : 0 } as any}
          >
            <span className={styles.indicatorText}>
              {Math.floor(hour).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <p className={cn(styles.text, dmSerifDisplay.className)}>
        {Math.floor(hour).toString().padStart(2, '0')}:
        {Math.floor(minute).toString().padStart(2, '0')}
      </p>
    </div>
  );
}
