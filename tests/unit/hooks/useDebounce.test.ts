import { renderHook, act } from '@testing-library/react';
import { useDebounce } from 'src/hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('debounces value', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), { initialProps: { value: 'a' } });
    expect(result.current).toBe('a');
    rerender({ value: 'b' });
    // still 'a' before delay
    expect(result.current).toBe('a');
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe('b');
  });
});
