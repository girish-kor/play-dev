import React from 'react';
import { List } from '../utility/List';
import styled from 'styled-components';

interface Quest {
  id: string;
  title: string;
  objectives: string[];
  completed: boolean;
}

interface QuestTrackerProps {
  quests: Quest[];
  expanded?: boolean;
  showCompleted?: boolean;
}

const QuestItem = styled.div<{ $completed: boolean }>`
  opacity: ${({ $completed }) => ($completed ? 0.6 : 1)};
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
`;

export const QuestTracker: React.FC<QuestTrackerProps> = ({
  quests,
  expanded = true,
  showCompleted = false,
}) => {
  const filtered = showCompleted ? quests : quests.filter((q) => !q.completed);
  return (
    <div>
      <h4>Quests</h4>
      {expanded && (
        <List
          items={filtered}
          renderItem={(quest) => (
            <QuestItem $completed={quest.completed}>
              <strong>{quest.title}</strong>
              <ul>
                {quest.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </QuestItem>
          )}
          keyExtractor={(q) => q.id}
        />
      )}
    </div>
  );
};
