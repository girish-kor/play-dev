import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Portal } from '../../utils/Portal';
import { useTheme } from '../../hooks/useTheme';

type ToastType = 'info' | 'success' | 'error' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  action?: { label: string; onClick: () => void };
  onClose: () => void;
  onOpen?: () => void;
}

const ToastContainer = styled.div<{ $type: ToastType }>`
  background: ${({ theme, $type }) => {
    switch ($type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.info;
    }
  }};
  color: #fff;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 250px;
  max-width: 450px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ToastList = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ToastAction = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ToastClose = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  action,
  onClose,
  onOpen,
}) => {
  const theme = useTheme();

  useEffect(() => {
    onOpen?.();
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose, onOpen]);

  return (
    <Portal>
      <ToastList theme={theme}>
        <ToastContainer $type={type} theme={theme}>
          <span>{message}</span>
          {action && (
            <ToastAction onClick={action.onClick} theme={theme}>
              {action.label}
            </ToastAction>
          )}
          <ToastClose onClick={onClose} theme={theme}>
            ×
          </ToastClose>
        </ToastContainer>
      </ToastList>
    </Portal>
  );
};
