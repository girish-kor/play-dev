import React from 'react';
import { render, screen } from '@testing-library/react';
import { SkillTree } from 'src/components/character/SkillTree';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('SkillTree', () => {
  const skills = [{ id: '1', name: 'Fireball', unlocked: false, dependencies: [] }];
  it('renders skills', () => {
    render(
      <ThemeProvider>
        <SkillTree skills={skills} pointsAvailable={5} spentPoints={0} />
      </ThemeProvider>
    );
    expect(screen.getByText('Fireball')).toBeInTheDocument();
    expect(screen.getByText('Points: 5')).toBeInTheDocument();
  });
});
