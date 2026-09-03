import React from 'react';
import { render, screen } from '@testing-library/react';
import { InventoryGrid } from 'src/components/inventory/InventoryGrid';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('InventoryGrid', () => {
  const slots = [{ id: '1', item: { id: 'item1', name: 'Sword', quantity: 1 } }];
  it('renders slots', () => {
    render(
      <ThemeProvider>
        <InventoryGrid slots={slots} columns={4} rows={1} />
      </ThemeProvider>
    );
    expect(screen.getByText('S')).toBeInTheDocument();
  });
});
