'use client';

import { ColorPickerProvider } from './context';

interface ColorPickerProps {
  mode: 'rgb' | 'hsl';
  children: React.ReactNode;
}

export default function Root({ mode, children }: ColorPickerProps) {
  return <ColorPickerProvider mode={mode}>{children}</ColorPickerProvider>;
}
