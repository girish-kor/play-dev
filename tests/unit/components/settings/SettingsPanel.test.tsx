import React from 'react';
import { render, screen } from '@testing-library/react';
import { SettingsPanel } from 'src/components/settings/SettingsPanel';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('SettingsPanel', () => {
  const settings = { audio: { volume: 0.8, muted: false }, video: { brightness: 1, fullscreen: false }, keybindings: {} };
  it('renders tabs', () => {
    render(
      <ThemeProvider>
        <SettingsPanel settings={settings} onChange={jest.fn()} onSave={jest.fn()} onReset={jest.fn()} onClose={jest.fn()} />
      </ThemeProvider>
    );
    expect(screen.getByText('Audio')).toBeInTheDocument();
    expect(screen.getByText('Video')).toBeInTheDocument();
    expect(screen.getByText('Controls')).toBeInTheDocument();
  });
});
