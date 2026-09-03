import React from 'react';
import styled from 'styled-components';
import { ProgressBar } from '../utility/ProgressBar';
import { Spinner } from '../utility/Spinner';
import { useTheme } from '../../hooks/useTheme';

interface LoadingScreenProps {
  progress: number;
  statusText?: string;
  backgroundImage?: string;
  tip?: string;
}

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progress,
  statusText,
  backgroundImage,
  tip,
}) => {
  const theme = useTheme();
  return (
    <LoadingContainer theme={theme}>
      {backgroundImage && <div style={{ backgroundImage: `url(${backgroundImage})` }} />}
      <Spinner size={60} />
      <ProgressBar value={progress} max={100} label={statusText} />
      {tip && <p style={{ color: '#94a3b8' }}>{tip}</p>}
    </LoadingContainer>
  );
};
