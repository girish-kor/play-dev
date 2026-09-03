import { useState, useEffect } from 'react';

export function useBreakpoint(breakpoints: Record<string, number>) {
  const [breakpoint, setBreakpoint] = useState<string>('');

  useEffect(() => {
    const getBreakpoint = () => {
      const width = window.innerWidth;
      let matched = '';
      for (const [name, bp] of Object.entries(breakpoints)) {
        if (width >= bp) {
          matched = name;
        }
      }
      return matched;
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial breakpoint must be known synchronously on mount
    setBreakpoint(getBreakpoint());
    const handler = () => setBreakpoint(getBreakpoint());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoints]);

  return breakpoint;
}
