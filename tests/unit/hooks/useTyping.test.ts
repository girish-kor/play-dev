import { renderHook, act } from '@testing-library/react';
import { useTyping } from 'src/hooks/useTyping';

describe('useTyping', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('types text', () => {
    const { result } = renderHook(() => useTyping('Hi', 10));
    expect(result.current.displayedText).toBe('');
    act(() => {
      jest.advanceTimersByTime(30);
    });
    expect(result.current.displayedText).toBe('Hi');
    expect(result.current.isComplete).toBe(true);
  });
});
