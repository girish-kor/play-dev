import React from 'react';
import styled from 'styled-components';
import { useSettings } from '../../contexts/SettingsContext';
import { useTheme } from '../../hooks/useTheme';

interface HotkeyIndicatorProps {
  action: string;
  keyOverride?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const Kbd = styled.kbd<{ $size: string }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return theme.typography.fontSize.xs;
      case 'lg':
        return theme.typography.fontSize.lg;
      default:
        return theme.typography.fontSize.sm;
    }
  }};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

export const HotkeyIndicator: React.FC<HotkeyIndicatorProps> = ({
  action,
  keyOverride,
  size = 'md',
  children,
}) => {
  const { settings } = useSettings();
  const theme = useTheme();
  const key = keyOverride ?? settings.keybindings[action] ?? '?';
  return (
    <span>
      {children}
      <Kbd $size={size} theme={theme}>
        {key}
      </Kbd>
    </span>
  );
};
