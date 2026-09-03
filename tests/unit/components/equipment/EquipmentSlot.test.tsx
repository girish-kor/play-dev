import React from 'react';
import { render, screen } from '@testing-library/react';
import { EquipmentSlot } from 'src/components/equipment/EquipmentSlot';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('EquipmentSlot', () => {
  it('renders slot type', () => {
    render(
      <ThemeProvider>
        <EquipmentSlot slotType="Helmet" item={null} />
      </ThemeProvider>
    );
    expect(screen.getByText('Helmet')).toBeInTheDocument();
  });
});
