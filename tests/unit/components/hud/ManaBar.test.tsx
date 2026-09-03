import React from 'react';
import { render, screen } from '@testing-library/react';
import { ManaBar } from 'src/components/hud/ManaBar';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { GameStateProvider } from 'src/contexts/GameStateContext';

describe('ManaBar', () => {
  it('renders', () => {
    render(
      <ThemeProvider>
        <GameStateProvider>
          <ManaBar />
        </GameStateProvider>
      </ThemeProvider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
