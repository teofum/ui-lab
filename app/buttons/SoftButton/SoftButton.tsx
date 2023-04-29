import styles from './SoftButton.module.css';

interface SoftButtonProps {
  icon?: boolean;

  children?: React.ReactNode;
}

export default function SoftButton({ icon, children }: SoftButtonProps) {
  return (
    <button className={styles.button} data-icon={icon}>
      <div className={styles.buttonContent}>{children}</div>
    </button>
  );
}
