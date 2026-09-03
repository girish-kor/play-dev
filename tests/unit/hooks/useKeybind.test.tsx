import { renderHook } from '@testing-library/react';
import { useKeybind } from 'src/hooks/useKeybind';
import { SettingsProvider } from 'src/contexts/SettingsContext';
import React from 'react';

describe('useKeybind', () => {
  it('calls handler on keydown', () => {
    const handler = jest.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => <SettingsProvider>{children}</SettingsProvider>;
    renderHook(() => useKeybind('pause', handler), { wrapper });
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(event);
    expect(handler).toHaveBeenCalledWith(event);
  });
});
