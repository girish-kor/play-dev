import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import { useId } from '../../hooks/useId';

interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

const ToggleContainer = styled.label<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const ToggleSwitch = styled.div<{ $checked: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  background: ${({ theme, $checked }) => ($checked ? theme.colors.primary : theme.colors.border)};
  border-radius: 12px;
  transition: background ${({ theme }) => theme.animations.duration.fast};
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $checked }) => ($checked ? '22px' : '2px')};
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    transition: left ${({ theme }) => theme.animations.duration.fast};
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  label,
  onChange,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (!isControlled) setInternalChecked(newChecked);
    onChange?.(newChecked);
  };

  const theme = useTheme();

  return (
    <ToggleContainer $disabled={disabled} theme={theme}>
      <ToggleSwitch $checked={isChecked} theme={theme} />
      <HiddenInput
        id={id}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        role="switch"
        aria-checked={isChecked}
      />
      {label && <span>{label}</span>}
    </ToggleContainer>
  );
};
