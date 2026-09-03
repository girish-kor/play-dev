import React from 'react';
import { InventorySlot, type InventoryItem } from '../inventory/InventorySlot';

interface EquipmentSlotProps {
  slotType: string;
  item: InventoryItem | null;
  locked?: boolean;
  onClick?: () => void;
}

export const EquipmentSlot: React.FC<EquipmentSlotProps> = ({
  slotType,
  item,
  locked = false,
  onClick,
}) => {
  return (
    <div style={{ position: 'relative', opacity: locked ? 0.4 : 1 }}>
      <InventorySlot item={item} onClick={locked ? undefined : onClick} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, fontSize: '10px' }}>{slotType}</div>
    </div>
  );
};
