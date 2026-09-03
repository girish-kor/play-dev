import React from 'react';
import { Modal } from '../utility/Modal';
import { List } from '../utility/List';
import { Tab } from '../utility/Tab';

interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface QuestJournalProps {
  quests: Quest[];
  onSelect: (id: string) => void;
  onTrack: (id: string) => void;
  onAbandon: (id: string) => void;
}

export const QuestJournal: React.FC<QuestJournalProps> = ({
  quests,
  onSelect,
  onTrack,
  onAbandon,
}) => {
  const active = quests.filter((q) => !q.completed);
  const completed = quests.filter((q) => q.completed);

  const renderActiveQuest = (quest: Quest) => (
    <div>
      <span onClick={() => onSelect(quest.id)}>{quest.title}</span>
      <button onClick={() => onTrack(quest.id)}>Track</button>
      <button onClick={() => onAbandon(quest.id)}>Abandon</button>
    </div>
  );

  const tabs = [
    {
      label: 'Active',
      content: <List items={active} renderItem={renderActiveQuest} keyExtractor={(q) => q.id} />,
    },
    {
      label: 'Completed',
      content: (
        <List
          items={completed}
          renderItem={(q) => <div onClick={() => onSelect(q.id)}>{q.title}</div>}
          keyExtractor={(q) => q.id}
        />
      ),
    },
  ];

  return (
    <Modal isOpen={true} title="Quest Journal">
      <Tab tabs={tabs} />
    </Modal>
  );
};
