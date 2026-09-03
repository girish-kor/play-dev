import { renderHook } from '@testing-library/react';
import { usePopper } from 'src/hooks/usePopper';
import React from 'react';

describe('usePopper', () => {
  it('returns position', () => {
    const triggerRef = React.createRef<HTMLDivElement>();
    const contentRef = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => usePopper(triggerRef, contentRef, 'bottom'));
    expect(result.current.position).toEqual({ top: 0, left: 0 });
  });
});
