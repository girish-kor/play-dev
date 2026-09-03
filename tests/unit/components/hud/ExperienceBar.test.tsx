import React from 'react';
import { render, screen } from '@testing-library/react';
import { ExperienceBar } from 'src/components/hud/ExperienceBar';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { GameStateProvider } from 'src/contexts/GameStateContext';

describe('ExperienceBar', () => {
  it('renders', () => {
    render(
      <ThemeProvider>
        <GameStateProvider>
          <ExperienceBar />
        </GameStateProvider>
      </ThemeProvider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
