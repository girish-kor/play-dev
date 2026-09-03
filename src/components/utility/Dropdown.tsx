import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Portal } from '../../utils/Portal';
import { usePopper } from '../../hooks/usePopper';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useListNavigation } from '../../hooks/useListNavigation';
import { useTheme } from '../../hooks/useTheme';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selected?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const DropdownTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DropdownList = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  max-height: 200px;
  overflow-y: auto;
  min-width: 150px;
`;

const DropdownItem = styled.li<{ $selected: boolean; $highlighted: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  background: ${({ $selected, $highlighted, theme }) =>
    $selected ? theme.colors.primary : $highlighted ? `${theme.colors.primary}40` : 'transparent'};
  color: ${({ $selected, theme }) => ($selected ? '#fff' : theme.colors.text)};
  &:hover {
    background: ${({ theme }) => theme.colors.primary}40;
  }
`;

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  placeholder = 'Select...',
  onChange,
  disabled = false,
  onOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const theme = useTheme();

  const selectedOption = options.find((opt) => opt.value === selected);

  const toggleOpen = () => {
    if (disabled) return;
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    if (newOpen) onOpen?.();
    else onClose?.();
  };

  const handleSelect = (value: string) => {
    onChange?.(value);
    setIsOpen(false);
    onClose?.();
  };

  useClickOutside(listRef, () => {
    if (isOpen) {
      setIsOpen(false);
      onClose?.();
    }
  });

  const { selectedIndex } = useListNavigation(options, (item) => handleSelect(item.value));

  const { position } = usePopper(triggerRef, listRef, 'bottom');

  return (
    <div>
      <DropdownTrigger
        ref={triggerRef}
        onClick={toggleOpen}
        disabled={disabled}
        theme={theme}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <span>▼</span>
      </DropdownTrigger>
      {isOpen && (
        <Portal>
          <DropdownList
            ref={listRef}
            theme={theme}
            style={{ position: 'fixed', top: position.top, left: position.left }}
            role="listbox"
          >
            {options.map((opt, index) => (
              <DropdownItem
                key={opt.value}
                $selected={opt.value === selected}
                $highlighted={index === selectedIndex}
                onClick={() => handleSelect(opt.value)}
                theme={theme}
                role="option"
                aria-selected={opt.value === selected}
                data-index={index}
              >
                {opt.label}
              </DropdownItem>
            ))}
          </DropdownList>
        </Portal>
      )}
    </div>
  );
};
