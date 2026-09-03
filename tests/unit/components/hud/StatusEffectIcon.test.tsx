import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusEffectIcon } from 'src/components/hud/StatusEffectIcon';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('StatusEffectIcon', () => {
  it('renders icon and timer', () => {
    render(
      <ThemeProvider>
        <StatusEffectIcon effect="Poison" remainingTime={5} icon={<span>💀</span>} tooltipContent="Poison" />
      </ThemeProvider>
    );
    expect(screen.getByText('💀')).toBeInTheDocument();
    expect(screen.getByText('5s')).toBeInTheDocument();
  });
});
