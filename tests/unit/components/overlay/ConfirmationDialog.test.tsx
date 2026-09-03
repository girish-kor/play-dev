import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialog } from 'src/components/overlay/ConfirmationDialog';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('ConfirmationDialog', () => {
  it('calls onConfirm and onCancel', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    render(
      <ThemeProvider>
        <ConfirmationDialog title="Delete Item?" message="Are you sure?" onConfirm={onConfirm} onCancel={onCancel} />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalled();
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });
});
