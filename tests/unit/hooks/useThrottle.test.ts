import { renderHook, act } from '@testing-library/react';
import { useThrottle } from 'src/hooks/useThrottle';

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('throttles value', () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 100), { initialProps: { value: 1 } });
    expect(result.current).toBe(1);
    rerender({ value: 2 });
    // should still be 1 due to throttle
    expect(result.current).toBe(1);
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe(2);
  });
});
