import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

type CardVariant = 'elevated' | 'outlined';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: string;
  className?: string;
}

const StyledCard = styled.div<{
  $variant: CardVariant;
  $padding: string;
}>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ $padding }) => $padding};
  ${({ $variant, theme }) =>
    $variant === 'elevated'
      ? `box-shadow: ${theme.shadow.md};`
      : `border: 1px solid ${theme.colors.border};`}
`;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = '16px',
  className,
}) => {
  const theme = useTheme();
  return (
    <StyledCard $variant={variant} $padding={padding} className={className} theme={theme}>
      {children}
    </StyledCard>
  );
};
