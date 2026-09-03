import React from 'react';
import { Modal } from '../utility/Modal';
import { Button } from '../utility/Button';

interface LevelUpModalProps {
  newLevel: number;
  statPointsEarned: number;
  unlockedAbilities: string[];
  onConfirm: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  newLevel,
  statPointsEarned,
  unlockedAbilities,
  onConfirm,
}) => {
  return (
    <Modal isOpen={true} onRequestClose={onConfirm} title={`Level ${newLevel}!`}>
      <p>You gained {statPointsEarned} stat points.</p>
      {unlockedAbilities.length > 0 && (
        <div>
          <h4>Unlocked:</h4>
          <ul>
            {unlockedAbilities.map((ab) => (
              <li key={ab}>{ab}</li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={onConfirm}>Continue</Button>
    </Modal>
  );
};
