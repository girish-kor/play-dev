import React from 'react';
import { render, screen } from '@testing-library/react';
import { CharacterPanel } from 'src/components/character/CharacterPanel';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('CharacterPanel', () => {
  const player = { name: 'Hero', level: 5, stats: { str: 10, dex: 12 } };
  it('displays player info', () => {
    render(
      <ThemeProvider>
        <CharacterPanel player={player} />
      </ThemeProvider>
    );
    expect(screen.getByText('Hero')).toBeInTheDocument();
    expect(screen.getByText('Level 5')).toBeInTheDocument();
    expect(screen.getByText('str')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
