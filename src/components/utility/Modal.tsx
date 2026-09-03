import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { Portal } from '../../utils/Portal';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useTheme } from '../../hooks/useTheme';

interface ModalProps {
  isOpen: boolean;
  onRequestClose?: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const ModalContent = styled.div<{ $size: string }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return '400px';
      case 'md':
        return '600px';
      case 'lg':
        return '800px';
      case 'xl':
        return '1000px';
      default:
        return '600px';
    }
  }};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadow.xl};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  title,
  size = 'md',
  closeOnOverlayClick = true,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEscapeKey(() => onRequestClose?.());
  useFocusTrap(contentRef, isOpen, true);

  useClickOutside(contentRef, (_event) => {
    if (closeOnOverlayClick) {
      onRequestClose?.();
    }
  });

  if (!isOpen) return null;

  return (
    <Portal>
      <Overlay
        theme={theme}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <ModalContent ref={contentRef} $size={size} theme={theme}>
          {onRequestClose && (
            <CloseButton onClick={onRequestClose} theme={theme} aria-label="Close modal">
              ×
            </CloseButton>
          )}
          {title && (
            <Title id="modal-title" theme={theme}>
              {title}
            </Title>
          )}
          {children}
        </ModalContent>
      </Overlay>
    </Portal>
  );
};
