import React from 'react';
import { render, screen } from '@testing-library/react';
import { CombatText } from 'src/components/feedback/CombatText';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('CombatText', () => {
  it('renders floating text', () => {
    render(
      <ThemeProvider>
        <CombatText value={50} type="damage" position={{ x: 100, y: 100 }} />
      </ThemeProvider>
    );
    expect(screen.getByText('50')).toBeInTheDocument();
  });
});
