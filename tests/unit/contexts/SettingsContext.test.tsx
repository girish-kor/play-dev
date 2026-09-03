import React from 'react';
import { render, screen } from '@testing-library/react';
import { SettingsProvider, useSettings } from 'src/contexts/SettingsContext';

describe('SettingsContext', () => {
  it('provides settings', () => {
    const TestComponent = () => {
      const { settings } = useSettings();
      return <div data-testid="volume">{settings.audio.volume}</div>;
    };
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );
    expect(screen.getByTestId('volume')).toHaveTextContent('0.8');
  });
});
