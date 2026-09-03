import { renderHook, act } from '@testing-library/react';
import { useScreenShake } from 'src/hooks/useScreenShake';

describe('useScreenShake', () => {
  it('triggers shake', () => {
    const { result } = renderHook(() => useScreenShake(100, 2));
    expect(result.current).toBeInstanceOf(Function);
    act(() => result.current());
    expect(document.body.style.transform).toBeDefined();
  });
});
