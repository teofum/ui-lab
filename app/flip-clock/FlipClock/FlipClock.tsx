'use client';

import { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './FlipClock.module.css';
import { dmSerifDisplay } from '@/styles/fonts';

const hours = Array.from(Array<number>(24), (_, i) => i);
const minutes = Array.from(Array<number>(60), (_, i) => i);
const seconds = Array.from(Array<number>(60), (_, i) => i);

const currentAngle = -2;
const lastAngle = -180;

interface FlipClockProps {
  withSeconds?: boolean;
}

export default function FlipClock({ withSeconds = false }: FlipClockProps) {
  const [time, setTime] = useState(new Date());

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  useEffect(() => {
    const refreshTime = () => setTime(new Date());

    const interval = setInterval(refreshTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getHourStyle = (h: number) => {
    const last = hour === 0 ? 23 : hour - 1;
    let angle = 0;

    if (h === hour) angle = currentAngle;
    else if (h === last) angle = lastAngle;
    else {
      let diff = last - h;
      if (diff < 0) diff += 24;
      angle = -180 - (diff / 22) * 180;
      if (angle < -270) angle += 360;
    }

    return {
      '--angle': `${angle}deg`,
      '--duration': angle > 45 || angle < -225 ? 0 : 1,
    };
  };

  const getMinuteStyle = (m: number) => {
    const last = minute === 0 ? 59 : minute - 1;
    let angle = 0;

    if (m === minute) angle = currentAngle;
    else if (m === last) angle = lastAngle;
    else {
      let diff = last - m;
      if (diff < 0) diff += 60;
      angle = -180 - (diff / 58) * 180;
      if (angle < -270) angle += 360;
    }

    return {
      '--angle': `${angle}deg`,
      '--duration': angle > 45 || angle < -225 ? 0 : 1,
    };
  };

  const getSecondStyle = (s: number) => {
    const last = second === 0 ? 59 : second - 1;
    let angle = 0;

    if (s === second) angle = currentAngle;
    else if (s === last) angle = lastAngle;
    else {
      let diff = last - s;
      if (diff < 0) diff += 60;
      angle = -180 - (diff / 58) * 180;
      if (angle < -270) angle += 360;
    }

    return {
      '--angle': `${angle}deg`,
      '--duration': angle > 45 || angle < -225 ? 0 : 1,
    };
  };

  const changeTime = (unit: 'hour' | 'minute' | 'second', amt: number) => {
    const newTime = new Date(time);

    if (unit === 'hour') newTime.setHours(hour + amt);
    else if (unit === 'minute') newTime.setMinutes(minute + amt);
    else newTime.setSeconds(second + amt);

    setTime(newTime);
  };

  return (
    <div className={styles.clock}>
      <div className={styles.section}>
        <button className={styles.up} onClick={() => changeTime('hour', -1)} />
        <button className={styles.down} onClick={() => changeTime('hour', 1)} />

        {hours.map((h) => (
          <div key={h} className={styles.flip} style={getHourStyle(h) as any}>
            <div className={cn(dmSerifDisplay.className, styles.flipTop)}>
              <span>{h.toString().padStart(2, '0')}</span>
            </div>
            <div className={cn(dmSerifDisplay.className, styles.flipBottom)}>
              <span>{((h + 1) % 24).toString().padStart(2, '0')}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={cn(dmSerifDisplay.className, styles.divider)}>:</div>

      <div className={styles.section}>
        <button
          className={styles.up}
          onClick={() => changeTime('minute', -1)}
        />
        <button
          className={styles.down}
          onClick={() => changeTime('minute', 1)}
        />

        {minutes.map((m) => (
          <div key={m} className={styles.flip} style={getMinuteStyle(m) as any}>
            <div className={cn(dmSerifDisplay.className, styles.flipTop)}>
              <span>{m.toString().padStart(2, '0')}</span>
            </div>
            <div className={cn(dmSerifDisplay.className, styles.flipBottom)}>
              <span>{((m + 1) % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
        ))}
      </div>

      {withSeconds && (
        <>
          <div className={cn(dmSerifDisplay.className, styles.divider)}>:</div>

          <div className={styles.section}>
            <button
              className={styles.up}
              onClick={() => changeTime('second', -1)}
            />
            <button
              className={styles.down}
              onClick={() => changeTime('second', 1)}
            />

            {seconds.map((s) => (
              <div
                key={s}
                className={styles.flip}
                style={getSecondStyle(s) as any}
              >
                <div className={cn(dmSerifDisplay.className, styles.flipTop)}>
                  <span>{s.toString().padStart(2, '0')}</span>
                </div>
                <div
                  className={cn(dmSerifDisplay.className, styles.flipBottom)}
                >
                  <span>{((s + 1) % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
