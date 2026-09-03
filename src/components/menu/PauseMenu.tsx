import React from 'react';
import { Modal } from '../utility/Modal';
import { Button } from '../utility/Button';

interface PauseMenuProps {
  onResume: () => void;
  onSettings: () => void;
  onQuit: () => void;
  onRestart: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({
  onResume,
  onSettings,
  onQuit,
  onRestart,
}) => {
  return (
    <Modal isOpen={true} onRequestClose={onResume} title="Paused">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button onClick={onResume}>Resume</Button>
        <Button onClick={onSettings} variant="secondary">
          Settings
        </Button>
        <Button onClick={onRestart} variant="warning">
          Restart
        </Button>
        <Button onClick={onQuit} variant="danger">
          Quit
        </Button>
      </div>
    </Modal>
  );
};
