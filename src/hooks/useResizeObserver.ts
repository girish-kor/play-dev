import { useEffect, useState, RefObject } from 'react';

export function useResizeObserver<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
): DOMRectReadOnly | null {
  const [rect, setRect] = useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setRect(entries[0].contentRect);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return rect;
}
