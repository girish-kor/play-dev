import { renderHook, act } from '@testing-library/react';
import { useListNavigation } from 'src/hooks/useListNavigation';

describe('useListNavigation', () => {
  it('navigates with arrow keys', () => {
    const onSelect = jest.fn();
    const items = ['a', 'b'];
    const { result } = renderHook(() => useListNavigation(items, onSelect));
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    });
    expect(result.current.selectedIndex).toBe(0);
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    });
    expect(result.current.selectedIndex).toBe(1);
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
    expect(onSelect).toHaveBeenCalledWith('b', 1);
  });
});
