import { renderHook } from '@testing-library/react';
import { useFocus } from 'src/hooks/useFocus';

describe('useFocus', () => {
  it('returns ref and focus state', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());
    const [ref, focused] = result.current;
    expect(ref.current).toBeNull();
    expect(focused).toBe(false);
  });
});
