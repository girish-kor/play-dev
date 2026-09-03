import React, { useRef } from 'react';
import { Portal } from '../../utils/Portal';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useTheme } from '../../hooks/useTheme';
import styled from 'styled-components';

interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  action: () => void;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  position: { x: number; y: number };
  onClose: () => void;
}

const MenuContainer = styled.ul`
  position: fixed;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  min-width: 150px;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  list-style: none;
`;

const MenuItem = styled.li<{ $disabled: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  &:hover {
    background: ${({ $disabled, theme }) => ($disabled ? 'transparent' : theme.colors.primary + '40')};
  }
`;

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, position, onClose }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const theme = useTheme();
  useClickOutside(menuRef, onClose);

  return (
    <Portal>
      <MenuContainer ref={menuRef} style={{ left: position.x, top: position.y }} theme={theme}>
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            $disabled={!!item.disabled}
            theme={theme}
            onClick={() => {
              if (!item.disabled) {
                item.action();
                onClose();
              }
            }}
          >
            {item.icon && <span>{item.icon} </span>}
            {item.label}
          </MenuItem>
        ))}
      </MenuContainer>
    </Portal>
  );
};
