import { useState, useRef, useCallback, useEffect, type RefObject } from 'react';

export function useHover<T extends HTMLElement = HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return [ref, isHovering];
}
