'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './FunkyButton.module.css';

interface FunkyButtonProps {
  icon?: boolean;
  effectAmount?: number;
  effectDelay?: number;

  children?: React.ReactNode;
}

const MAX_SHIFT = 0.5;
const SHIFT_UNIT = 'rem';
const MAX_ROTATION = 3.5;

const makeClipPath = (maxShift = MAX_SHIFT, unit = SHIFT_UNIT) => {
  // Array of eight random numbers in range 0-MAX_SHIFT
  const shifts = Array.from(Array<number>(8), () => Math.random() * maxShift);

  // Build clip-path string
  const clipPath = `polygon(
    ${shifts[0]}${unit} ${shifts[1]}${unit},
    calc(100% - ${shifts[2]}${unit}) ${shifts[3]}${unit},
    calc(100% - ${shifts[4]}${unit}) calc(100% - ${shifts[5]}${unit}),
    ${shifts[6]}${unit} calc(100% - ${shifts[7]}${unit})
  )`;

  return clipPath;
};

export default function FunkyButton({
  icon,
  children,
  effectAmount = 2,
  effectDelay = 200,
}: FunkyButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const intervalRef = useRef<{ interval: NodeJS.Timer | null }>({
    interval: null,
  });

  const [hover, setHover] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    if (hover) {
      const refreshClipPaths = () => {
        const clip1 = makeClipPath(effectAmount);
        const clip2 = makeClipPath(effectAmount);

        button.style.setProperty('--clip-1', clip1);
        button.style.setProperty('--clip-2', clip2);
      };

      refreshClipPaths();
      const interval = setInterval(refreshClipPaths, effectDelay);
      if (intervalRef.current.interval)
        clearInterval(intervalRef.current.interval);
      intervalRef.current.interval = interval;

      return () => {
        clearInterval(interval);
      };
    } else {
      const resetClipPaths = () => {
        const clip1 = 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)';
        const clip2 = 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)';

        button.style.setProperty('--clip-1', clip1);
        button.style.setProperty('--clip-2', clip2);
      };

      resetClipPaths();

      if (intervalRef.current.interval)
        clearInterval(intervalRef.current.interval);
    }
  }, [hover, effectAmount, effectDelay]);

  const baseClipPath = useMemo(() => makeClipPath(), []);
  const contentTransform = useMemo(
    () => `rotateZ(${(Math.random() - 0.5) * 2 * MAX_ROTATION}deg)`,
    [],
  );

  return (
    <button
      className={styles.button}
      data-icon={icon}
      ref={buttonRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ '--effect-delay': `${effectDelay}ms` } as any}
    >
      <div className={styles.buttonClip} style={{ clipPath: baseClipPath }}>
        <div
          className={styles.buttonContent}
          style={{ transform: contentTransform }}
        >
          {children}
        </div>
      </div>
    </button>
  );
}
