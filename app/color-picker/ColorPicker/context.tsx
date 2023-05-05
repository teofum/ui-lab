import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type PickerMode = 'rgb' | 'hsl';
type Color = [number, number, number];

interface ColorPickerContextType {
  mode: PickerMode;
  color: Color;
  setColor: Dispatch<SetStateAction<Color>>;
}

const ColorPickerContext = createContext<ColorPickerContextType>({
  mode: 'rgb',
  color: [0, 0, 0],
  setColor: () => {},
});

interface ProviderProps {
  mode: PickerMode;
  children: React.ReactNode;
}

export function ColorPickerProvider({ mode, children }: ProviderProps) {
  const [color, setColor] = useState<Color>(
    mode === 'hsl' ? [0, 1, 0.5] : [1, 0, 0],
  );

  return (
    <ColorPickerContext.Provider value={{ mode, color, setColor }}>
      {children}
    </ColorPickerContext.Provider>
  );
}

export const useColorPicker = () => useContext(ColorPickerContext);
