import React from 'react';
import styled from 'styled-components';
import { Tooltip } from '../utility/Tooltip';
import { useTheme } from '../../hooks/useTheme';

interface StatusEffectIconProps {
  effect: string;
  remainingTime?: number;
  icon: React.ReactNode;
  tooltipContent: React.ReactNode;
  onClick?: () => void;
}

const EffectContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
`;

const TimerOverlay = styled.span`
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text};
`;

export const StatusEffectIcon: React.FC<StatusEffectIconProps> = ({
  effect,
  remainingTime,
  icon,
  tooltipContent,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <Tooltip content={tooltipContent}>
      <EffectContainer onClick={onClick} theme={theme} role="img" aria-label={effect}>
        {icon}
        {remainingTime !== undefined && (
          <TimerOverlay theme={theme}>{Math.ceil(remainingTime)}s</TimerOverlay>
        )}
      </EffectContainer>
    </Tooltip>
  );
};
