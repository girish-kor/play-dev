import { renderHook } from '@testing-library/react';
import { useAssetsLoader } from 'src/hooks/useAssetsLoader';

describe('useAssetsLoader', () => {
  it('loads assets', () => {
    const { result } = renderHook(() => useAssetsLoader(['test.jpg']));
    expect(result.current.progress).toBe(0);
  });
});
