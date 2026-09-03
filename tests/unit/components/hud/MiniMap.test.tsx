import React from 'react';
import { render, screen } from '@testing-library/react';
import { MiniMap } from 'src/components/hud/MiniMap';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('MiniMap', () => {
  it('renders canvas', () => {
    render(
      <ThemeProvider>
        <MiniMap />
      </ThemeProvider>
    );
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
