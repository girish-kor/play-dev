import { useEffect, useRef, RefObject, useCallback } from 'react';

export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  containerRef: RefObject<T | null>,
  active: boolean = true,
  autoFocus: boolean = true,
) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const focusFirstElement = useCallback(() => {
    if (!containerRef.current) return;
    const focusable = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      containerRef.current.focus();
    }
  }, [containerRef]);

  useEffect(() => {
    if (!active) return;
    previousFocusRef.current = document.activeElement as HTMLElement;

    if (autoFocus) {
      focusFirstElement();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [active, autoFocus, focusFirstElement, containerRef]);
}
