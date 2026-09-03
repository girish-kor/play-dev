import React from 'react';
import { render, screen } from '@testing-library/react';
import { DamageFeedback } from 'src/components/feedback/DamageFeedback';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('DamageFeedback', () => {
  it('renders flash overlay when damage > 0', () => {
    render(
      <ThemeProvider>
        <DamageFeedback damage={10} />
      </ThemeProvider>
    );
    expect(screen.getByTestId('damage-flash-overlay')).toBeInTheDocument();
  });
});
