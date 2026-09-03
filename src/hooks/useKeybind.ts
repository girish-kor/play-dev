import { useEffect, useCallback } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export function useKeybind(
  action: string,
  handler: (event: KeyboardEvent) => void,
  dependencies: unknown[] = [],
  preventDefault: boolean = true,
) {
  const { settings } = useSettings();
  const key = settings.keybindings[action];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        if (preventDefault) event.preventDefault();
        handler(event);
      }
    },
    [key, handler, preventDefault],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dependencies is a caller-supplied array of unknown length, spread intentionally
  }, [handleKeyDown, ...dependencies]);
}
