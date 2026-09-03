import React from 'react';
import { render, screen } from '@testing-library/react';
import { InventorySlot } from 'src/components/inventory/InventorySlot';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('InventorySlot', () => {
  it('renders item', () => {
    render(
      <ThemeProvider>
        <InventorySlot item={{ id: '1', name: 'Sword' }} />
      </ThemeProvider>
    );
    expect(screen.getByText('S')).toBeInTheDocument();
  });
  it('renders empty slot', () => {
    render(
      <ThemeProvider>
        <InventorySlot item={null} />
      </ThemeProvider>
    );
    const slot = document.querySelector('div');
    expect(slot).toBeInTheDocument();
  });
});
