import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatBox } from 'src/components/multiplayer/ChatBox';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('ChatBox', () => {
  const messages = [{ id: '1', user: 'Alice', text: 'Hello', timestamp: 0 }];
  it('renders messages', () => {
    render(
      <ThemeProvider>
        <ChatBox messages={messages} channel="global" onSend={jest.fn()} />
      </ThemeProvider>
    );
    expect(screen.getByText('Alice:')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
  it('sends message on button click', () => {
    const onSend = jest.fn();
    render(
      <ThemeProvider>
        <ChatBox messages={[]} channel="global" onSend={onSend} />
      </ThemeProvider>
    );
    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'Hi' } });
    fireEvent.click(screen.getByText('Send'));
    expect(onSend).toHaveBeenCalledWith('Hi');
  });
});
