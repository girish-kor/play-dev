import { renderHook } from '@testing-library/react';
import { useEscapeKey } from 'src/hooks/useEscapeKey';

describe('useEscapeKey', () => {
  it('calls handler on Escape key', () => {
    const handler = jest.fn();
    renderHook(() => useEscapeKey(handler));
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(handler).toHaveBeenCalled();
  });
});
