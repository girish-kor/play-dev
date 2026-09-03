import React from 'react';
import { render, screen } from '@testing-library/react';
import { QuestTracker } from 'src/components/hud/QuestTracker';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('QuestTracker', () => {
  const quests = [{ id: '1', title: 'Kill 10 rats', objectives: ['Bring 10 rat tails to the innkeeper'], completed: false }];
  it('renders quests', () => {
    render(
      <ThemeProvider>
        <QuestTracker quests={quests} />
      </ThemeProvider>
    );
    expect(screen.getByText('Kill 10 rats')).toBeInTheDocument();
    expect(screen.getByText('Bring 10 rat tails to the innkeeper')).toBeInTheDocument();
  });
});
