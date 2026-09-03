import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
}

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $loading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.fast}
    ${({ theme }) => theme.animations.easing};
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  ${({ $variant, theme }) => {
    const colorMap = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      success: theme.colors.success,
      danger: theme.colors.error,
      warning: theme.colors.warning,
      info: theme.colors.info,
    };
    const bg = colorMap[$variant] || theme.colors.primary;
    return css`
      background: ${bg};
      color: #fff;
      &:hover:not(:disabled) {
        filter: brightness(1.1);
      }
      &:active:not(:disabled) {
        filter: brightness(0.9);
      }
    `;
  }}
  ${({ $size, theme }) => {
    const sizeMap = {
      sm: {
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        fontSize: theme.typography.fontSize.sm,
      },
      md: {
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        fontSize: theme.typography.fontSize.md,
      },
      lg: {
        padding: `${theme.spacing.md} ${theme.spacing.lg}`,
        fontSize: theme.typography.fontSize.lg,
      },
    };
    const s = sizeMap[$size] || sizeMap.md;
    return css`
      padding: ${s.padding};
      font-size: ${s.fontSize};
    `;
  }}
  ${({ $loading }) =>
    $loading &&
    css`
      position: relative;
      color: transparent;
      &::after {
        content: '';
        position: absolute;
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  ariaLabel,
  ...props
}) => {
  const theme = useTheme();
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      disabled={disabled || loading}
      $loading={loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      theme={theme}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
