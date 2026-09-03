import { renderHook } from '@testing-library/react';
import { useBreakpoint } from 'src/hooks/useBreakpoint';

describe('useBreakpoint', () => {
  it('returns breakpoint', () => {
    const breakpoints = { sm: 0, md: 768, lg: 1024 };
    const { result } = renderHook(() => useBreakpoint(breakpoints));
    expect(result.current).toBe('lg');
  });
});
