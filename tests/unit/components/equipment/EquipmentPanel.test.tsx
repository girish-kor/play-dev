import React from 'react';
import { render, screen } from '@testing-library/react';
import { EquipmentPanel } from 'src/components/equipment/EquipmentPanel';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('EquipmentPanel', () => {
  const slots = { head: null, chest: null };
  const stats = { str: 10 };
  it('renders', () => {
    render(
      <ThemeProvider>
        <EquipmentPanel slots={slots} characterStats={stats} />
      </ThemeProvider>
    );
    expect(screen.getByText('str')).toBeInTheDocument();
  });
});
