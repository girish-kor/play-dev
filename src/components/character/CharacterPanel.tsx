import React from 'react';
import { Card } from '../utility/Card';
import { Avatar } from '../utility/Avatar';
import { StatsDisplay } from './StatsDisplay';

interface CharacterPanelProps {
  player: { name: string; level: number; stats: Record<string, number>; avatar?: string };
}

export const CharacterPanel: React.FC<CharacterPanelProps> = ({ player }) => {
  return (
    <Card>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar src={player.avatar} alt={player.name} size={64} fallback={player.name[0]} />
        <div>
          <h3>{player.name}</h3>
          <span>Level {player.level}</span>
        </div>
      </div>
      <StatsDisplay stats={player.stats} />
    </Card>
  );
};
