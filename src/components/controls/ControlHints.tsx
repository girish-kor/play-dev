import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

interface ActionHint {
  action: string;
  label: string;
  key: string;
}

interface ControlHintsProps {
  actions: ActionHint[];
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const HintContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(0, 0, 0, 0.5);
  border-radius: ${({ theme }) => theme.radius.md};
`;

const HintItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const ControlHints: React.FC<ControlHintsProps> = ({ actions }) => {
  const theme = useTheme();
  return (
    <HintContainer theme={theme}>
      {actions.map((hint, idx) => (
        <HintItem key={idx} theme={theme}>
          <kbd>{hint.key}</kbd>
          <span>{hint.label}</span>
        </HintItem>
      ))}
    </HintContainer>
  );
};
