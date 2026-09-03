import { renderHook } from '@testing-library/react';
import { useCanvas } from 'src/hooks/useCanvas';

describe('useCanvas', () => {
  it('returns ref', () => {
    const draw = jest.fn();
    const { result } = renderHook(() => useCanvas(draw, []));
    expect(result.current.current).toBeNull();
  });
});
