import { renderHook } from '@testing-library/react';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';

describe('useInfiniteScroll', () => {
  it('returns ref', () => {
    const loadMore = jest.fn();
    const { result } = renderHook(() => useInfiniteScroll(loadMore, true, false));
    expect(result.current.current).toBeNull();
  });
});
