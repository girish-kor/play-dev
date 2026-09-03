import React from 'react';
import { ProgressBar } from '../utility/ProgressBar';
import { useGameState } from '../../hooks/useGameState';
import { useTheme } from '../../hooks/useTheme';
import styled from 'styled-components';

const StaminaBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

interface StaminaBarProps {
  current?: number;
  max?: number;
  showText?: boolean;
  regenRate?: number;
}

export const StaminaBar: React.FC<StaminaBarProps> = ({ current, max, showText = true }) => {
  const gameState = useGameState((state) => state.player);
  const stamina = current ?? gameState.stamina;
  const maxStamina = max ?? gameState.maxStamina;
  const theme = useTheme();

  return (
    <StaminaBarWrapper theme={theme}>
      <ProgressBar
        value={stamina}
        max={maxStamina}
        label={showText ? `${stamina}/${maxStamina}` : undefined}
        variant="default"
      />
    </StaminaBarWrapper>
  );
};
