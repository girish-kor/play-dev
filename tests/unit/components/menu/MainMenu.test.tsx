import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainMenu } from 'src/components/menu/MainMenu';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('MainMenu', () => {
  it('calls onStart when clicked', () => {
    const onStart = jest.fn();
    render(
      <ThemeProvider>
        <MainMenu onStart={onStart} onLoad={jest.fn()} onSettings={jest.fn()} onExit={jest.fn()} />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Start Game'));
    expect(onStart).toHaveBeenCalled();
  });
});
