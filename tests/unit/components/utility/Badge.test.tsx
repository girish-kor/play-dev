import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from 'src/components/utility/Badge';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Badge', () => {
  it('renders number badge', () => {
    render(
      <ThemeProvider>
        <Badge content={5} />
      </ThemeProvider>
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders dot badge', () => {
    render(
      <ThemeProvider>
        <Badge variant="dot" />
      </ThemeProvider>
    );
    const badge = screen.getByRole('presentation');
    expect(badge).toBeInTheDocument();
  });
});
