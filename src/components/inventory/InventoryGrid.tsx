import React from 'react';
import styled from 'styled-components';
import { InventorySlot } from './InventorySlot';
import { useTheme } from '../../hooks/useTheme';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

type InventorySlotData = { id: string; item: InventoryItem | null };

interface InventoryGridProps {
  slots: InventorySlotData[];
  columns: number;
  rows: number;
  draggable?: boolean;
  onSlotClick?: (slot: InventorySlotData) => void;
}

const Grid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const InventoryGrid: React.FC<InventoryGridProps> = ({
  slots,
  columns,
  rows,
  draggable = false,
  onSlotClick,
}) => {
  const totalSlots = columns * rows;
  const paddedSlots: InventorySlotData[] =
    slots.length >= totalSlots
      ? slots
      : [
          ...slots,
          ...Array.from({ length: totalSlots - slots.length }, (_, i) => ({
            id: `empty-${i}`,
            item: null,
          })),
        ];
  const theme = useTheme();

  return (
    <Grid $columns={columns} theme={theme}>
      {paddedSlots.map((slot) => (
        <div key={slot.id} draggable={draggable && !!slot.item}>
          <InventorySlot
            item={slot.item}
            quantity={slot.item?.quantity}
            onClick={() => onSlotClick?.(slot)}
          />
        </div>
      ))}
    </Grid>
  );
};
