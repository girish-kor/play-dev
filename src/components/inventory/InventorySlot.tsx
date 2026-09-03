import React from 'react';
import styled from 'styled-components';
import { Tooltip } from '../utility/Tooltip';
import { Badge } from '../utility/Badge';
import { useTheme } from '../../hooks/useTheme';

export interface InventoryItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface InventorySlotProps {
  item: InventoryItem | null;
  quantity?: number;
  selected?: boolean;
  highlight?: boolean;
  onClick?: () => void;
}

const Slot = styled.div<{ $selected: boolean; $highlight: boolean }>`
  width: 60px;
  height: 60px;
  background: ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.surface)};
  border: 2px solid
    ${({ theme, $highlight }) => ($highlight ? theme.colors.success : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

export const InventorySlot: React.FC<InventorySlotProps> = ({
  item,
  quantity,
  selected = false,
  highlight = false,
  onClick,
}) => {
  const theme = useTheme();
  if (!item) {
    return <Slot $selected={selected} $highlight={highlight} onClick={onClick} theme={theme} />;
  }

  return (
    <Tooltip content={item.name}>
      <Slot $selected={selected} $highlight={highlight} onClick={onClick} theme={theme}>
        {item.icon || item.name[0]}
        {quantity && quantity > 1 && (
          <Badge
            content={quantity}
            variant="number"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          />
        )}
      </Slot>
    </Tooltip>
  );
};
