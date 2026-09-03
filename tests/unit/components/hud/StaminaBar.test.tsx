import React from 'react';
import { render, screen } from '@testing-library/react';
import { StaminaBar } from 'src/components/hud/StaminaBar';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { GameStateProvider } from 'src/contexts/GameStateContext';

describe('StaminaBar', () => {
  it('renders', () => {
    render(
      <ThemeProvider>
        <GameStateProvider>
          <StaminaBar />
        </GameStateProvider>
      </ThemeProvider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
