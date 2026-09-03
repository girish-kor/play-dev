import { useState, useRef, useCallback, useEffect, type RefObject } from 'react';

export function useFocus<T extends HTMLElement = HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    node.addEventListener('focus', handleFocus);
    node.addEventListener('blur', handleBlur);
    return () => {
      node.removeEventListener('focus', handleFocus);
      node.removeEventListener('blur', handleBlur);
    };
  }, [handleFocus, handleBlur]);

  return [ref, isFocused];
}
