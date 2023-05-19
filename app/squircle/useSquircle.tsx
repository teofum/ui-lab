import { useMemo } from 'react';

export default function useSquircle(squareness: number) {
  const url = useMemo(() => {
    const sq = squareness * (1 - 0.562) + 0.562;

    const a = 50 - sq * 50;
    const b = 50 + sq * 50;
    const path = `M50 0C${b} 0 100 ${a} 100 50S${b} 100 50 100S0 ${b} 0 50S${a} 0 50 0`;
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
        <path d='${path}' />
      </svg>
    `.replaceAll(/\n\s*/g, '');

    const encodedSvg = btoa(svg);
    return `data:image/svg+xml;base64,${encodedSvg}`;
  }, [squareness]);

  return {
    '-webkit-mask-image': `url("${url}")`,
    maskImage: `url("${url}")`,

    '-webkit-mask-size': '100% 100%',
    maskSize: '100% 100%',

    '-webkit-mask-repeat': 'no-repeat',
    maskRepeat: 'no-repeat',
  };
}
