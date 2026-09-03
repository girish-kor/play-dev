import React from 'react';
import { List } from '../utility/List';
import { Avatar } from '../utility/Avatar';
import { HealthBar } from '../hud/HealthBar';

interface PartyMember {
  id: string;
  name: string;
  class: string;
  health: number;
  maxHealth: number;
  status: 'online' | 'offline';
}

interface PartyPanelProps {
  members: PartyMember[];
  leaderId: string;
}

export const PartyPanel: React.FC<PartyPanelProps> = ({ members, leaderId }) => {
  return (
    <div>
      <h4>Party</h4>
      <List
        items={members}
        renderItem={(member) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Avatar size={32} fallback={member.name[0]} />
            <div>
              <div>
                <span>{member.name}</span> {member.id === leaderId && <span>⭐</span>}
              </div>
              <HealthBar current={member.health} max={member.maxHealth} showText={false} />
            </div>
          </div>
        )}
        keyExtractor={(m) => m.id}
      />
    </div>
  );
};
