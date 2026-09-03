import React from 'react';
import { render, screen } from '@testing-library/react';
import { IconButton } from 'src/components/utility/IconButton';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('IconButton', () => {
  it('renders icon and aria-label', () => {
    render(
      <ThemeProvider>
        <IconButton icon={<span>★</span>} ariaLabel="star" />
      </ThemeProvider>
    );
    expect(screen.getByLabelText('star')).toBeInTheDocument();
    expect(screen.getByText('★')).toBeInTheDocument();
  });
});
