import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

interface CurrencyDisplayProps {
  currencyType: string;
  amount: number;
  icon?: React.ReactNode;
  format?: 'short' | 'long';
}

const CurrencyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
`;

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  currencyType,
  amount,
  icon,
  format = 'long',
}) => {
  const formatted =
    format === 'short'
      ? amount >= 1000
        ? `${(amount / 1000).toFixed(1)}k`
        : String(amount)
      : String(amount);
  const theme = useTheme();
  return (
    <CurrencyContainer theme={theme}>
      {icon && <span>{icon}</span>}
      <span>
        {formatted} {currencyType}
      </span>
    </CurrencyContainer>
  );
};
