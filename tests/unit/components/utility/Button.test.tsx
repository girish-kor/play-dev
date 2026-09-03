import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from 'src/components/utility/Button';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Button', () => {
  it('renders children', () => {
    render(
      <ThemeProvider>
        <Button>Click</Button>
      </ThemeProvider>
    );
    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider>
        <Button onClick={handleClick}>Click</Button>
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when loading', () => {
    render(
      <ThemeProvider>
        <Button loading>Loading</Button>
      </ThemeProvider>
    );
    expect(screen.getByText('Loading')).toBeDisabled();
    expect(screen.getByText('Loading')).toHaveAttribute('aria-busy', 'true');
  });

  it('applies variant styles', () => {
    render(
      <ThemeProvider>
        <Button variant="danger">Danger</Button>
      </ThemeProvider>
    );
    const btn = screen.getByText('Danger');
    expect(btn).toHaveStyle('background: #ef4444');
  });
});
