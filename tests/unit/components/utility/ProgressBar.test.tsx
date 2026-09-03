import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from 'src/components/utility/ProgressBar';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('ProgressBar', () => {
  it('renders with label', () => {
    render(
      <ThemeProvider>
        <ProgressBar value={50} max={100} label="50%" />
      </ThemeProvider>
    );
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });
});
