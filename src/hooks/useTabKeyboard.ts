import { useCallback, useEffect, type RefObject } from 'react';

export function useTabKeyboard(
  containerRef: RefObject<HTMLElement | null>,
  onTabChange: (index: number) => void,
  tabCount: number,
) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const tabs = containerRef.current?.querySelectorAll('[role="tab"]');
        if (!tabs) return;
        let currentIndex = Array.from(tabs).findIndex(
          (tab) => tab.getAttribute('aria-selected') === 'true',
        );
        if (currentIndex === -1) currentIndex = 0;
        const newIndex =
          event.key === 'ArrowRight'
            ? (currentIndex + 1) % tabCount
            : (currentIndex - 1 + tabCount) % tabCount;
        onTabChange(newIndex);
      }
    },
    [containerRef, onTabChange, tabCount],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
