import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import { useId } from '../../hooks/useId';

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxContainer = styled.label<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.div<{ $checked: boolean; $indeterminate: boolean }>`
  width: 20px;
  height: 20px;
  background: ${({ theme, $checked, $indeterminate }) => ($checked || $indeterminate ? theme.colors.primary : 'transparent')};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background ${({ theme }) => theme.animations.duration.fast};
  &::after {
    content: '${({ $checked, $indeterminate }) => {
      if ($indeterminate) return '—';
      if ($checked) return '✓';
      return '';
    }}';
    color: #fff;
    font-size: 14px;
    line-height: 1;
  }
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  label,
  indeterminate = false,
  onChange,
}) => {
  const id = useId();
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <CheckboxContainer $disabled={disabled} theme={theme}>
      <HiddenCheckbox
        id={id}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
        aria-checked={indeterminate ? 'mixed' : checked}
      />
      <StyledCheckbox
        $checked={!!checked}
        $indeterminate={indeterminate}
        theme={theme}
        aria-hidden="true"
      />
      {label && <span>{label}</span>}
    </CheckboxContainer>
  );
};
