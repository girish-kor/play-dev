import React from 'react';
import { render, screen } from '@testing-library/react';
import { CurrencyDisplay } from 'src/components/hud/CurrencyDisplay';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('CurrencyDisplay', () => {
  it('formats amount', () => {
    render(
      <ThemeProvider>
        <CurrencyDisplay currencyType="Gold" amount={1500} />
      </ThemeProvider>
    );
    expect(screen.getByText('1500 Gold')).toBeInTheDocument();
  });
  it('formats short', () => {
    render(
      <ThemeProvider>
        <CurrencyDisplay currencyType="Gold" amount={1500} format="short" />
      </ThemeProvider>
    );
    expect(screen.getByText('1.5k Gold')).toBeInTheDocument();
  });
});
