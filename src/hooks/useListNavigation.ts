import { useState, useCallback, useEffect } from 'react';

export function useListNavigation<T>(items: T[], onSelect?: (item: T, index: number) => void) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (items.length === 0) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % items.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (event.key === 'Enter' && selectedIndex >= 0) {
        event.preventDefault();
        onSelect?.(items[selectedIndex], selectedIndex);
      }
    },
    [items, selectedIndex, onSelect],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { selectedIndex, setSelectedIndex };
}
