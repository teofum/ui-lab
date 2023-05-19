import cn from 'classnames';
import useSquircle from './useSquircle';

type ElementProps<T extends HTMLElement> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

interface SquircleProps {
  squareness?: number;
}

export function Squircle({
  squareness = 1,
  ...props
}: ElementProps<HTMLDivElement> & SquircleProps) {
  const style = useSquircle(squareness);
  return <div style={style} {...props} />;
}

export function SquircleButton({
  squareness = 1,
  ...props
}: ElementProps<HTMLButtonElement> & SquircleProps) {
  const style = useSquircle(squareness);
  return <button style={style} {...props} />;
}
