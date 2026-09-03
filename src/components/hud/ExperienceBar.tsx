import React from 'react';
import { ProgressBar } from '../utility/ProgressBar';
import { useGameState } from '../../hooks/useGameState';

interface ExperienceBarProps {
  currentXP?: number;
  nextLevelXP?: number;
  level?: number;
}

export const ExperienceBar: React.FC<ExperienceBarProps> = ({ currentXP, nextLevelXP, level }) => {
  const player = useGameState((state) => state.player);
  const xp = currentXP ?? player.experience;
  const next = nextLevelXP ?? player.nextLevelExperience;
  const lvl = level ?? player.level;

  return (
    <div>
      <ProgressBar
        value={xp}
        max={next}
        label={`Level ${lvl} (${xp}/${next})`}
        variant="animated"
      />
    </div>
  );
};
