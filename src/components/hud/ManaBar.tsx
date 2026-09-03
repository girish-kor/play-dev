import React from 'react';
import { ProgressBar } from '../utility/ProgressBar';
import { useGameState } from '../../hooks/useGameState';

interface ManaBarProps {
  current?: number;
  max?: number;
}

export const ManaBar: React.FC<ManaBarProps> = ({ current, max }) => {
  const player = useGameState((state) => state.player);
  const mana = current ?? player.mana;
  const maxMana = max ?? player.maxMana;
  return <ProgressBar value={mana} max={maxMana} label={`${mana}/${maxMana}`} />;
};
