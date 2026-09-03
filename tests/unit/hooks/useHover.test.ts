import { renderHook, act } from '@testing-library/react';
import { useHover } from 'src/hooks/useHover';

describe('useHover', () => {
  it('returns ref and hover state', () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>());
    const [ref, hover] = result.current;
    expect(ref.current).toBeNull();
    expect(hover).toBe(false);
  });
});
