import { renderHook } from '@testing-library/react';
import { useFocusTrap } from 'src/hooks/useFocusTrap';
import React from 'react';

describe('useFocusTrap', () => {
  it('does not throw', () => {
    const ref = React.createRef<HTMLDivElement>();
    expect(() => renderHook(() => useFocusTrap(ref, true))).not.toThrow();
  });
});
