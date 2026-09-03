import { renderHook } from '@testing-library/react';
import { useTabKeyboard } from 'src/hooks/useTabKeyboard';

describe('useTabKeyboard', () => {
  it('calls onTabChange on arrow keys', () => {
    const onTabChange = jest.fn();
    const containerRef = { current: document.createElement('div') };
    renderHook(() => useTabKeyboard(containerRef, onTabChange, 2));
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    document.dispatchEvent(event);
    expect(onTabChange).toHaveBeenCalledWith(1);
  });
});
