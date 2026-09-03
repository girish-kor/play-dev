import React from 'react';
import { render, screen } from '@testing-library/react';
import { QuestJournal } from 'src/components/quest/QuestJournal';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('QuestJournal', () => {
  const quests = [{ id: '1', title: 'Quest 1', description: 'Do something', completed: false }];
  it('renders active quests', () => {
    render(
      <ThemeProvider>
        <QuestJournal quests={quests} onSelect={jest.fn()} onTrack={jest.fn()} onAbandon={jest.fn()} />
      </ThemeProvider>
    );
    expect(screen.getByText('Quest 1')).toBeInTheDocument();
  });
});
