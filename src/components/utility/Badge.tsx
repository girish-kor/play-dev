import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

type BadgeVariant = 'dot' | 'number';
type BadgeColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

interface BadgeProps {
  content?: number | string;
  color?: BadgeColor;
  variant?: BadgeVariant;
  max?: number;
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' };
  children?: React.ReactNode;
}

const BadgeContainer = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const BadgeDot = styled.span<{
  $color: BadgeColor;
  $variant: BadgeVariant;
  $anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' };
}>`
  position: absolute;
  ${({ $anchorOrigin }) => {
    const v = $anchorOrigin?.vertical || 'top';
    const h = $anchorOrigin?.horizontal || 'right';
    return `
      ${v}: -4px;
      ${h}: -4px;
    `;
  }}
  background: ${({ theme, $color }) => theme.colors[$color] || theme.colors.primary};
  color: #fff;
  border-radius: ${({ $variant }) => ($variant === 'dot' ? '50%' : '10px')};
  width: ${({ $variant }) => ($variant === 'dot' ? '10px' : 'auto')};
  height: ${({ $variant }) => ($variant === 'dot' ? '10px' : 'auto')};
  min-width: ${({ $variant }) => ($variant === 'number' ? '20px' : '0')};
  padding: ${({ $variant }) => ($variant === 'number' ? '2px 6px' : '0')};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Badge: React.FC<BadgeProps> = ({
  content,
  color = 'primary',
  variant = 'number',
  max = 99,
  anchorOrigin,
  children,
}) => {
  const theme = useTheme();

  let displayContent = content;
  if (variant === 'number' && typeof content === 'number' && content > max) {
    displayContent = `${max}+`;
  }
  if (variant === 'dot') {
    displayContent = undefined;
  }
  if (variant === 'number' && content === 0) {
    return <>{children}</>;
  }

  return (
    <BadgeContainer theme={theme}>
      {children}
      <BadgeDot
        $color={color}
        $variant={variant}
        $anchorOrigin={anchorOrigin}
        theme={theme}
        role={variant === 'number' ? 'status' : 'presentation'}
        aria-label={variant === 'number' ? String(content) : undefined}
      >
        {displayContent}
      </BadgeDot>
    </BadgeContainer>
  );
};
