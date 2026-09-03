import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import { useId } from '../../hooks/useId';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  label?: string;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
}

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SliderInput = styled.input`
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    border: none;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  disabled = false,
  label,
  onChange,
  onChangeEnd,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const id = useId();
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  const handleChangeEnd = () => {
    onChangeEnd?.(currentValue);
  };

  return (
    <SliderContainer theme={theme}>
      {label && <label htmlFor={id}>{label}</label>}
      <SliderInput
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        disabled={disabled}
        onChange={handleChange}
        onMouseUp={handleChangeEnd}
        onTouchEnd={handleChangeEnd}
        theme={theme}
        aria-label={label}
        aria-valuenow={currentValue}
        aria-valuemin={min}
        aria-valuemax={max}
      />
    </SliderContainer>
  );
};
