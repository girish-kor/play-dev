import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import { useId } from '../../hooks/useId';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selected?: string;
  name?: string;
  disabled?: boolean;
  label?: string;
  onChange?: (value: string) => void;
}

const RadioGroupContainer = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Legend = styled.legend`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const RadioOptionLabel = styled.label<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledRadio = styled.div<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $checked, theme }) => ($checked ? theme.colors.primary : 'transparent')};
  }
`;

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selected,
  name,
  disabled = false,
  label,
  onChange,
}) => {
  const generatedName = useId();
  const groupName = name || generatedName;
  const theme = useTheme();

  return (
    <RadioGroupContainer theme={theme} role="radiogroup" aria-label={label}>
      {label && <Legend theme={theme}>{label}</Legend>}
      {options.map((opt) => (
        <RadioOptionLabel key={opt.value} $disabled={disabled} theme={theme}>
          <HiddenRadio
            type="radio"
            name={groupName}
            value={opt.value}
            checked={opt.value === selected}
            disabled={disabled}
            onChange={() => onChange?.(opt.value)}
          />
          <StyledRadio $checked={opt.value === selected} theme={theme} aria-hidden="true" />
          {opt.label}
        </RadioOptionLabel>
      ))}
    </RadioGroupContainer>
  );
};
