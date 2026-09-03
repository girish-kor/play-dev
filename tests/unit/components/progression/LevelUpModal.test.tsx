import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LevelUpModal } from 'src/components/progression/LevelUpModal';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('LevelUpModal', () => {
  it('displays level and abilities', () => {
    render(
      <ThemeProvider>
        <LevelUpModal newLevel={2} statPointsEarned={5} unlockedAbilities={['Fireball']} onConfirm={jest.fn()} />
      </ThemeProvider>
    );
    expect(screen.getByText('Level 2!')).toBeInTheDocument();
    expect(screen.getByText('Fireball')).toBeInTheDocument();
  });
  it('calls onConfirm on button click', () => {
    const onConfirm = jest.fn();
    render(
      <ThemeProvider>
        <LevelUpModal newLevel={2} statPointsEarned={5} unlockedAbilities={[]} onConfirm={onConfirm} />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Continue'));
    expect(onConfirm).toHaveBeenCalled();
  });
});
