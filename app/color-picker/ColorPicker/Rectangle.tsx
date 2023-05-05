'use client';

import { useCallback, useRef } from 'react';
import cn from 'classnames';

import useDrag, { isTouch } from '@/hooks/useDrag';
import { useColorPicker } from './context';

import styles from './Rectangle.module.css';

type Channel = 'red' | 'green' | 'blue' | 'hue' | 'saturation' | 'lightness';
type ChannelX = 'red' | 'green' | 'blue' | 'hue' | 'saturation';
type ChannelY = 'red' | 'green' | 'blue' | 'saturation' | 'lightness';

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

function getChannelGradients(
  color: [number, number, number],
  channelX: Channel,
  channelY: Channel,
) {
  let [h, s, l] = color;
  s = s * 100;
  l = l * 100;

  let [r, g, b] = color.map((c) => c * 255);

  let gradientX = '';
  let gradientY = '';
  let blendModeY = '';

  /**
   * RGB combinations
   */
  if (channelX === 'red') {
    if (channelY === 'green') {
      gradientX = `rgb(0, 0, ${b}), rgb(255, 0, ${b})`;
      gradientY = `rgb(0, 0, ${b}), rgb(0, 255, ${b})`;
    }
    if (channelY === 'blue') {
      gradientX = `rgb(0, ${g}, 0), rgb(255, ${g}, 0)`;
      gradientY = `rgb(0, ${g}, 0), rgb(0, ${g}, 255)`;
    }
    blendModeY = 'lighten';
  }

  if (channelX === 'green') {
    if (channelY === 'red') {
      gradientX = `rgb(0, 0, ${b}), rgb(0, 255, ${b})`;
      gradientY = `rgb(0, 0, ${b}), rgb(255, 0, ${b})`;
    }
    if (channelY === 'blue') {
      gradientX = `rgb(${r}, 0, 0), rgb(${r}, 255, 0)`;
      gradientY = `rgb(${r}, 0, 0), rgb(${r}, 0, 255)`;
    }
    blendModeY = 'lighten';
  }

  if (channelX === 'blue') {
    if (channelY === 'red') {
      gradientX = `rgb(0, ${g}, 0), rgb(0, ${g}, 255)`;
      gradientY = `rgb(0, ${g}, 0), rgb(255, ${g}, 0)`;
    }
    if (channelY === 'green') {
      gradientX = `rgb(${r}, 0, 0), rgb(${r}, 0, 255)`;
      gradientY = `rgb(${r}, 0, 0), rgb(${r}, 255, 0)`;
    }
    blendModeY = 'lighten';
  }

  /**
   * HSL combinations
   */
  if (channelX === 'hue') {
    if (channelY === 'saturation') {
      gradientX = hueGradient(100, l);
      gradientY = `hsl(0, 0%, ${l}%), hsla(0, 0%, ${l}%, 0)`;
      blendModeY = 'normal';
    }
    if (channelY === 'lightness') {
      gradientX = hueGradient(s, 50);
      gradientY = `hsl(0, 0%, 0%), hsl(0, 0%, 100%)`;
      blendModeY = 'hard-light';
    }
  }

  if (channelX === 'saturation') {
    if (channelY === 'lightness') {
      gradientX = `hsl(${h}, 0%, 50%), hsl(${h}, 50%, 50%), hsl(${h}, 100%, 50%)`;
      gradientY = `hsl(0, 0%, 0%), hsl(0, 0%, 100%)`;
      blendModeY = 'hard-light';
    }
  }

  gradientX = `linear-gradient(to right, ${gradientX})`;
  gradientY = `linear-gradient(to top, ${gradientY})`;

  return {
    x: gradientX,
    y: gradientY,
    blendMode: blendModeY,
  };
}

function getChannelPosition(color: [number, number, number], channel: Channel) {
  let [h, s, l] = color;
  s = s * 100;
  l = l * 100;

  let [r, g, b] = color.map((c) => c * 255);

  switch (channel) {
    case 'red':
      return r / 255;
    case 'green':
      return g / 255;
    case 'blue':
      return b / 255;
    case 'hue':
      return h / 360;
    case 'saturation':
      return s / 100;
    case 'lightness':
      return l / 100;
  }
}

interface RectangleProps {
  channelX: ChannelX;
  channelY: ChannelY;

  width?: number;
  height?: number;
  knobSize?: number;
  border?: number;
}

export default function Rectangle({
  channelX,
  channelY,
  width = 144,
  height = 144,
  knobSize = 24,
  border = 2,
}: RectangleProps) {
  const { mode, color, setColor } = useColorPicker();
  const baseRef = useRef<HTMLDivElement>(null);

  const onDrag = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      const base = baseRef.current;
      if (!base) return;

      const rect = base.getBoundingClientRect();
      const startX = rect.left;
      const startY = rect.bottom;

      const { clientX, clientY } = isTouch(ev) ? ev.touches[0] : ev;
      let x = clientX - startX;
      let y = startY - clientY;

      let rangeX = x / (width - knobSize / 2 + border * 4);
      rangeX = Math.max(0, Math.min(1, rangeX));

      let rangeY = y / (height - knobSize / 2 + border * 4);
      rangeY = Math.max(0, Math.min(1, rangeY));

      setColor((color) => {
        let [rh, gs, bl] = color;

        switch (channelX) {
          case 'red':
            rh = rangeX;
            break;
          case 'hue':
            rh = rangeX * 360;
            break;
          case 'green':
          case 'saturation':
            gs = rangeX;
            break;
          case 'blue':
            bl = rangeX;
            break;
        }

        switch (channelY) {
          case 'red':
            rh = rangeY;
            break;
          case 'green':
          case 'saturation':
            gs = rangeY;
            break;
          case 'blue':
          case 'lightness':
            bl = rangeY;
            break;
        }

        return [rh, gs, bl];
      });
    },
    [setColor, channelX, channelY, width, height, knobSize, border],
  );

  const { dragHandler, touchHandler } = useDrag(onDrag);

  /**
   * Validations
   */
  if (mode === 'hsl' && ['red', 'green', 'blue'].includes(channelX))
    return <div>{channelX} channel is only available in RGB mode.</div>;

  if (mode === 'rgb' && ['hue', 'saturation', 'lightness'].includes(channelX))
    return <div>{channelX} channel is only available in HSL mode.</div>;

  if (mode === 'hsl' && ['red', 'green', 'blue'].includes(channelY))
    return <div>{channelY} channel is only available in RGB mode.</div>;

  if (mode === 'rgb' && ['hue', 'saturation', 'lightness'].includes(channelY))
    return <div>{channelY} channel is only available in HSL mode.</div>;

  /**
   * Color math
   */
  let [h, s, l] = color;
  s = s * 100;
  l = l * 100;

  let [r, g, b] = color.map((c) => c * 255);

  const cssColor =
    mode === 'hsl' ? `hsl(${h}, ${s}%, ${l}%)` : `rgb(${r}, ${g}, ${b})`;

  const gradients = getChannelGradients(color, channelX, channelY);
  const positionX = getChannelPosition(color, channelX);
  const positionY = getChannelPosition(color, channelY);

  return (
    <div
      className={styles.root}
      style={
        {
          '--width': `${width}px`,
          '--height': `${height}px`,
          '--knob-size': `${knobSize}px`,
          '--border': `${border}px`,
          '--color': cssColor,
          '--gradient-x': gradients.x,
          '--gradient-y': gradients.y,
          '--slider-x': positionX,
          '--slider-y': positionY,
          '--blend-mode-y': gradients.blendMode,
        } as any
      }
    >
      <div className={styles.base} ref={baseRef}>
        <div
          className={styles.knob}
          onMouseDown={dragHandler}
          onTouchStart={touchHandler}
        />
      </div>
    </div>
  );
}
