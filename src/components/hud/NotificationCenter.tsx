import React from 'react';
import { Portal } from '../../utils/Portal';
import styled from 'styled-components';
import { Toast } from '../utility/Toast';
import { useTheme } from '../../hooks/useTheme';

interface Notification {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  duration?: number;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  maxVisible?: number;
}

const NotificationList = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  z-index: ${({ theme }) => theme.zIndex.toast};
`;

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onDismiss,
  maxVisible = 5,
}) => {
  const visible = notifications.slice(0, maxVisible);
  const theme = useTheme();
  return (
    <Portal>
      <NotificationList theme={theme}>
        {visible.map((notif) => (
          <Toast
            key={notif.id}
            message={notif.message}
            type={notif.type}
            duration={notif.duration}
            onClose={() => onDismiss(notif.id)}
          />
        ))}
      </NotificationList>
    </Portal>
  );
};
