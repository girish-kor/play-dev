import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from 'src/components/utility/Card';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Card', () => {
  it('renders children', () => {
    render(
      <ThemeProvider>
        <Card>Content</Card>
      </ThemeProvider>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
