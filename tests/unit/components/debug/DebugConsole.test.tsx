import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DebugConsole } from 'src/components/debug/DebugConsole';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('DebugConsole', () => {
  it('renders logs', () => {
    render(
      <ThemeProvider>
        <DebugConsole logs={['log1', 'log2']} commands={[]} visible onCommand={jest.fn()} onClearLogs={jest.fn()} />
      </ThemeProvider>
    );
    expect(screen.getByText('log1')).toBeInTheDocument();
    expect(screen.getByText('log2')).toBeInTheDocument();
  });
  it('calls onCommand on Enter', () => {
    const onCommand = jest.fn();
    render(
      <ThemeProvider>
        <DebugConsole logs={[]} commands={[]} visible onCommand={onCommand} onClearLogs={jest.fn()} />
      </ThemeProvider>
    );
    const input = screen.getByPlaceholderText('Enter command...');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onCommand).toHaveBeenCalledWith('test');
  });
});
