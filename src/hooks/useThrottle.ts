import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef<number | null>(null);

  useEffect(() => {
    const startedAt = lastRan.current ?? Date.now();
    lastRan.current = startedAt;
    const handler = setTimeout(
      () => {
        if (Date.now() - startedAt >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      },
      limit - (Date.now() - startedAt),
    );

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}
