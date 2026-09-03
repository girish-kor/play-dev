import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

type ProgressVariant = 'default' | 'striped' | 'animated';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  variant?: ProgressVariant;
}

const ProgressContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  position: relative;
  height: 20px;
`;

const ProgressFill = styled.div<{
  $value: number;
  $variant: ProgressVariant;
}>`
  width: ${({ $value }) => `${Math.min($value, 100)}%`};
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width ${({ theme }) => theme.animations.duration.normal}
    ${({ theme }) => theme.animations.easing};
  ${({ $variant }) =>
    $variant === 'striped' &&
    css`
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
    `}
  ${({ $variant }) =>
    $variant === 'animated' &&
    css`
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
      animation: progress-animation 2s linear infinite;
      @keyframes progress-animation {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 1rem 0;
        }
      }
    `}
`;

const ProgressLabel = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  variant = 'default',
}) => {
  const percentage = Math.max(0, Math.min((value / max) * 100, 100));
  const theme = useTheme();
  return (
    <ProgressContainer
      theme={theme}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      aria-label={label}
    >
      <ProgressFill $value={percentage} $variant={variant} theme={theme} />
      {label && <ProgressLabel theme={theme}>{label}</ProgressLabel>}
    </ProgressContainer>
  );
};
