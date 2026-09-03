import React from 'react';
import { render, screen } from '@testing-library/react';
import { PartyPanel } from 'src/components/multiplayer/PartyPanel';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('PartyPanel', () => {
  const members = [{ id: '1', name: 'Alice', class: 'Warrior', health: 80, maxHealth: 100, status: 'online' }];
  it('renders members', () => {
    render(
      <ThemeProvider>
        <PartyPanel members={members} leaderId="1" />
      </ThemeProvider>
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
