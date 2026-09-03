import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from 'src/components/loading/LoadingScreen';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('LoadingScreen', () => {
  it('renders progress and tip', () => {
    render(
      <ThemeProvider>
        <LoadingScreen progress={50} statusText="Loading..." tip="Tip: Save often" />
      </ThemeProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Tip: Save often')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });
});
