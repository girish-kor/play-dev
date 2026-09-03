import { renderHook } from '@testing-library/react';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import React from 'react';

describe('useResizeObserver', () => {
  it('returns null initially', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useResizeObserver(ref));
    expect(result.current).toBeNull();
  });
});
