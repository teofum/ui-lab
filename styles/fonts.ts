import { Inter, DM_Mono, DM_Serif_Display } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-mono',
});

export const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-dm-serif-display',
});
