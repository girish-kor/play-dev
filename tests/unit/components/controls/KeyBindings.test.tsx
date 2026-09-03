import React from 'react';
import { render, screen } from '@testing-library/react';
import { KeyBindings } from 'src/components/controls/KeyBindings';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { SettingsProvider } from 'src/contexts/SettingsContext';

describe('KeyBindings', () => {
  it('renders bindings', () => {
    render(
      <ThemeProvider>
        <SettingsProvider>
          <KeyBindings bindings={{}} />
        </SettingsProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('pause')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Escape')).toBeInTheDocument();
  });
});
