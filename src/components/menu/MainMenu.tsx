import React from 'react';
import styled from 'styled-components';
import { Button } from '../utility/Button';
import { Modal } from '../utility/Modal';
import { useTheme } from '../../hooks/useTheme';

interface MainMenuProps {
  version?: string;
  backgroundImage?: string;
  title?: string;
  onStart: () => void;
  onLoad: () => void;
  onSettings: () => void;
  onExit: () => void;
}

const MenuContainer = styled.div<{ $backgroundImage?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  ${({ $backgroundImage }) =>
    $backgroundImage &&
    `background-image: url(${$backgroundImage}); background-size: cover; background-position: center;`}
`;

const MenuTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
`;

export const MainMenu: React.FC<MainMenuProps> = ({
  version,
  backgroundImage,
  title = 'PLAY-DEV',
  onStart,
  onLoad,
  onSettings,
  onExit,
}) => {
  const theme = useTheme();
  return (
    <Modal isOpen={true} onRequestClose={() => {}} title={title}>
      <MenuContainer $backgroundImage={backgroundImage} theme={theme}>
        <MenuTitle theme={theme}>{title}</MenuTitle>
        <Button onClick={onStart}>Start Game</Button>
        <Button onClick={onLoad} variant="secondary">
          Load Game
        </Button>
        <Button onClick={onSettings} variant="secondary">
          Settings
        </Button>
        <Button onClick={onExit} variant="danger">
          Exit
        </Button>
        {version && <small>v{version}</small>}
      </MenuContainer>
    </Modal>
  );
};
