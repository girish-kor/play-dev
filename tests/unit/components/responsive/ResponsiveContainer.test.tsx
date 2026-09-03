import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResponsiveContainer } from 'src/components/responsive/ResponsiveContainer';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('ResponsiveContainer', () => {
  it('passes breakpoint to children', () => {
    const breakpoints = { sm: 0, md: 768, lg: 1024 };
    render(
      <ThemeProvider>
        <ResponsiveContainer breakpoints={breakpoints}>
          {(bp) => <div data-testid="bp">{bp}</div>}
        </ResponsiveContainer>
      </ThemeProvider>
    );
    // in jsdom innerWidth is 1024, so it should match 'lg'
    expect(screen.getByTestId('bp')).toHaveTextContent('lg');
  });
});
