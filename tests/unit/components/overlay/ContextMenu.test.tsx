import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextMenu } from 'src/components/overlay/ContextMenu';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('ContextMenu', () => {
  const items = [{ label: 'Action', action: jest.fn() }];
  it('calls action on click', () => {
    const action = jest.fn();
    render(
      <ThemeProvider>
        <ContextMenu items={[{ label: 'Action', action }]} position={{ x: 10, y: 10 }} onClose={jest.fn()} />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Action'));
    expect(action).toHaveBeenCalled();
  });
});
