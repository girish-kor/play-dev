import { renderHook } from '@testing-library/react';
import { useOrientation } from 'src/hooks/useOrientation';

describe('useOrientation', () => {
  it('returns orientation', () => {
    const { result } = renderHook(() => useOrientation());
    // jsdom default is 1024x768 -> landscape
    expect(result.current).toBe('landscape');
  });
});
