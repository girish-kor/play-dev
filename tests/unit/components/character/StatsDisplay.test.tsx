import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatsDisplay } from 'src/components/character/StatsDisplay';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('StatsDisplay', () => {
  const stats = { str: 10, dex: 12 };
  it('renders stats', () => {
    render(
      <ThemeProvider>
        <StatsDisplay stats={stats} />
      </ThemeProvider>
    );
    expect(screen.getByText('str')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
