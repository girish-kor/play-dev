import { renderHook } from '@testing-library/react';
import { useClickOutside } from 'src/hooks/useClickOutside';
import React from 'react';

describe('useClickOutside', () => {
  it('calls handler on outside click', () => {
    const handler = jest.fn();
    const inside = document.createElement('div');
    document.body.appendChild(inside);
    const ref = React.createRef<HTMLDivElement>();
    (ref as React.MutableRefObject<HTMLDivElement | null>).current = inside;

    renderHook(() => useClickOutside(ref, handler));

    const outside = document.createElement('div');
    document.body.appendChild(outside);
    const event = new MouseEvent('mousedown', { bubbles: true });
    outside.dispatchEvent(event);
    expect(handler).toHaveBeenCalled();

    document.body.removeChild(inside);
    document.body.removeChild(outside);
  });
});
