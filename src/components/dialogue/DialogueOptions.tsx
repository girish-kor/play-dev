import React from 'react';
import { List } from '../utility/List';

interface DialogueOptionsProps {
  options: string[];
  selected?: number;
  onSelect: (index: number) => void;
}

export const DialogueOptions: React.FC<DialogueOptionsProps> = ({
  options,
  selected,
  onSelect,
}) => {
  return (
    <List
      items={options}
      renderItem={(opt, idx) => (
        <div
          onClick={() => onSelect(idx)}
          style={{ fontWeight: idx === selected ? 'bold' : 'normal' }}
        >
          {opt}
        </div>
      )}
      keyExtractor={(_, idx) => String(idx)}
    />
  );
};
