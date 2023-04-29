import styles from './KeyButton.module.css';

interface KeyButtonProps {
  icon?: boolean;

  children?: React.ReactNode;
}

export default function KeyButton({ icon, children }: KeyButtonProps) {
  return (
    <button className={styles.button} data-icon={icon}>
      <div className={styles.buttonContent}>{children}</div>
    </button>
  );
}
