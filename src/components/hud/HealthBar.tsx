import React from 'react';
import { ProgressBar } from '../utility/ProgressBar';
import { useGameState } from '../../hooks/useGameState';
import { useTheme } from '../../hooks/useTheme';
import styled from 'styled-components';

const HealthBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

interface HealthBarProps {
  current?: number;
  max?: number;
  showText?: boolean;
  animated?: boolean;
  flashOnLow?: boolean;
}

export const HealthBar: React.FC<HealthBarProps> = ({
  current,
  max,
  showText = true,
  animated = true,
  flashOnLow = true,
}) => {
  const gameState = useGameState((state) => state.player);
  const health = current ?? gameState.health;
  const maxHealth = max ?? gameState.maxHealth;
  const theme = useTheme();

  const percentage = Math.max(0, Math.min((health / maxHealth) * 100, 100));
  const isLow = flashOnLow && percentage < 25;

  return (
    <HealthBarWrapper theme={theme}>
      <ProgressBar
        value={health}
        max={maxHealth}
        label={showText ? `${health}/${maxHealth}` : undefined}
        variant={animated ? 'animated' : 'default'}
      />
      {isLow && <span role="alert">⚠️</span>}
    </HealthBarWrapper>
  );
};
