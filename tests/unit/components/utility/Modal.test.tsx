import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from 'src/components/utility/Modal';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Modal', () => {
  it('renders when open', () => {
    render(
      <ThemeProvider>
        <Modal isOpen title="Test Modal">
          Content
        </Modal>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onRequestClose on escape key', () => {
    const onClose = jest.fn();
    render(
      <ThemeProvider>
        <Modal isOpen onRequestClose={onClose}>
          Content
        </Modal>
      </ThemeProvider>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
