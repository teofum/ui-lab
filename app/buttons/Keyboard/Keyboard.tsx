import styles from './Keyboard.module.css';

const rows = [
  { shift: 0, keys: 'QWERTYUIOP' },
  { shift: 0.25, keys: 'ASDFGHJKL' },
  { shift: 0.75, keys: 'ZXCVBNM' },
];

interface KeyboardProps {
  KeyComponent: React.FC<any>;
}

export default function Keyboard({ KeyComponent }: KeyboardProps) {
  return (
    <div className={styles.board}>
      {rows.map((row) => (
        <div
          key={row.keys}
          className={styles.row}
          style={{ paddingLeft: `${row.shift * 3}rem` }}
        >
          {row.keys.split('').map((key) => (
            <div key={key}>
              <KeyComponent icon>{key}</KeyComponent>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
