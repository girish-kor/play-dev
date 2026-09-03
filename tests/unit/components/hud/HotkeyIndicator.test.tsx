import React from 'react';
import { render, screen } from '@testing-library/react';
import { HotkeyIndicator } from 'src/components/hud/HotkeyIndicator';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { SettingsProvider } from 'src/contexts/SettingsContext';

describe('HotkeyIndicator', () => {
  it('shows keybind from settings', () => {
    render(
      <ThemeProvider>
        <SettingsProvider>
          <HotkeyIndicator action="pause" />
        </SettingsProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('Escape')).toBeInTheDocument();
  });
});
