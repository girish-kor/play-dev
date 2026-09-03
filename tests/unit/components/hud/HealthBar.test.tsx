import React from 'react';
import { render, screen } from '@testing-library/react';
import { HealthBar } from 'src/components/hud/HealthBar';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { GameStateProvider } from 'src/contexts/GameStateContext';

describe('HealthBar', () => {
  it('renders with game state', () => {
    render(
      <ThemeProvider>
        <GameStateProvider>
          <HealthBar />
        </GameStateProvider>
      </ThemeProvider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows low health warning', () => {
    render(
      <ThemeProvider>
        <GameStateProvider>
          <HealthBar current={10} max={100} flashOnLow />
        </GameStateProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });
});
