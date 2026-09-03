import { renderHook, act } from '@testing-library/react';
import { useTimer } from 'src/hooks/useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('counts down', () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() => useTimer(2, onComplete));
    expect(result.current).toBe(2);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(1);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(0);
    expect(onComplete).toHaveBeenCalled();
  });
});
