import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

interface StatsDisplayProps {
  stats: Record<string, number>;
  colorMap?: Record<string, string>;
}

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xs};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, colorMap }) => {
  const theme = useTheme();
  return (
    <StatsGrid theme={theme}>
      {Object.entries(stats).map(([key, value]) => (
        <StatRow key={key} theme={theme}>
          <span>{key}</span>
          <span style={{ color: colorMap?.[key] || 'inherit' }}>{value}</span>
        </StatRow>
      ))}
    </StatsGrid>
  );
};
