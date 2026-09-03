import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PauseMenu } from 'src/components/menu/PauseMenu';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('PauseMenu', () => {
  it('calls onResume when clicked', () => {
    const onResume = jest.fn();
    render(
      <ThemeProvider>
        <PauseMenu onResume={onResume} onSettings={jest.fn()} onQuit={jest.fn()} onRestart={jest.fn()} />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Resume'));
    expect(onResume).toHaveBeenCalled();
  });
});
