import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from 'src/components/utility/Avatar';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Avatar', () => {
  it('renders fallback initials', () => {
    render(
      <ThemeProvider>
        <Avatar alt="John Doe" />
      </ThemeProvider>
    );
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders image when src provided', () => {
    render(
      <ThemeProvider>
        <Avatar src="test.jpg" alt="test" />
      </ThemeProvider>
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.jpg');
  });
});
