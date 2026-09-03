import { renderHook } from '@testing-library/react';
import { useImage } from 'src/hooks/useImage';

describe('useImage', () => {
  it('loads image', () => {
    const { result } = renderHook(() => useImage('test.jpg'));
    expect(result.current.loaded).toBe(false);
    expect(result.current.error).toBe(false);
  });
});
