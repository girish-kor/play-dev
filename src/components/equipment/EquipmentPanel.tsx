import React from 'react';
import { Card } from '../utility/Card';
import { EquipmentSlot } from './EquipmentSlot';
import { StatsDisplay } from '../character/StatsDisplay';
import type { InventoryItem } from '../inventory/InventorySlot';

interface EquipmentPanelProps {
  slots: Record<string, InventoryItem | null>;
  characterStats: Record<string, number>;
}

export const EquipmentPanel: React.FC<EquipmentPanelProps> = ({ slots, characterStats }) => {
  return (
    <Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
        {Object.entries(slots).map(([slotType, item]) => (
          <EquipmentSlot key={slotType} slotType={slotType} item={item} />
        ))}
      </div>
      <StatsDisplay stats={characterStats} />
    </Card>
  );
};
