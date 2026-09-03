import React from 'react';
import { render, screen } from '@testing-library/react';
import { Compass } from 'src/components/hud/Compass';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { GameStateProvider } from 'src/contexts/GameStateContext';

describe('Compass', () => {
  it('renders', () => {
    render(
      <ThemeProvider>
        <GameStateProvider>
          <Compass />
        </GameStateProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('N')).toBeInTheDocument();
  });
});
