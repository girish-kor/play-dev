import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

type SpinnerVariant = 'circular' | 'dots';

interface SpinnerProps {
  size?: number;
  color?: string;
  variant?: SpinnerVariant;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

const CircularSpinner = styled.div<{ $size: number; $color: string }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 4px solid ${({ $color }) => $color}40;
  border-top: 4px solid ${({ $color }) => $color};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const DotsSpinner = styled.div<{ $size: number; $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  & > div {
    width: ${({ $size }) => $size * 0.3}px;
    height: ${({ $size }) => $size * 0.3}px;
    background: ${({ $color }) => $color};
    border-radius: 50%;
    display: inline-block;
    animation: ${pulse} 1.4s infinite ease-in-out both;
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
`;

export const Spinner: React.FC<SpinnerProps> = ({ size = 40, color, variant = 'circular' }) => {
  const theme = useTheme();
  const finalColor = color || theme.colors.primary;

  if (variant === 'dots') {
    return (
      <DotsSpinner $size={size} $color={finalColor} theme={theme} role="status">
        <div />
        <div />
        <div />
      </DotsSpinner>
    );
  }

  return <CircularSpinner $size={size} $color={finalColor} theme={theme} role="status" />;
};
