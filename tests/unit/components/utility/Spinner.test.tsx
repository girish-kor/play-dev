import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from 'src/components/utility/Spinner';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Spinner', () => {
  it('renders circular spinner', () => {
    render(
      <ThemeProvider>
        <Spinner />
      </ThemeProvider>
    );
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });
});
