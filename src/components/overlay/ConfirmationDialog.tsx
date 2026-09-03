import React from 'react';
import { Modal } from '../utility/Modal';
import { Button } from '../utility/Button';

interface ConfirmationDialogProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={true} onRequestClose={onCancel} title={title}>
      <p>{message}</p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button variant={variant === 'danger' ? 'danger' : 'primary'} onClick={onConfirm}>
          {confirmText}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
      </div>
    </Modal>
  );
};
