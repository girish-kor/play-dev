import React from 'react';
import { render, screen } from '@testing-library/react';
import { ShopPanel } from 'src/components/economy/ShopPanel';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('ShopPanel', () => {
  const inventory = [{ id: '1', name: 'Potion', price: 10 }];
  const currency = { gold: 100 };
  it('renders items', () => {
    render(
      <ThemeProvider>
        <ShopPanel inventory={inventory} playerCurrency={currency} prices={{ buy: 1, sell: 0.5 }} onBuy={jest.fn()} onSell={jest.fn()} onClose={jest.fn()} />
      </ThemeProvider>
    );
    expect(screen.getByText('Potion')).toBeInTheDocument();
    expect(screen.getByText('10 Gold')).toBeInTheDocument();
    expect(screen.getByText('100 Gold')).toBeInTheDocument();
  });
});
