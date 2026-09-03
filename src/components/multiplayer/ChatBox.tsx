import React, { useState } from 'react';
import styled from 'styled-components';
import { List } from '../utility/List';
import { InputField } from '../utility/InputField';
import { Button } from '../utility/Button';
import { useTheme } from '../../hooks/useTheme';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: number;
}

interface ChatBoxProps {
  messages: ChatMessage[];
  channel: string;
  inputPlaceholder?: string;
  onSend: (message: string) => void;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.sm};
`;

const InputArea = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  channel,
  inputPlaceholder = 'Type a message...',
  onSend,
}) => {
  const [input, setInput] = useState('');
  const theme = useTheme();

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <ChatContainer theme={theme}>
      <div style={{ padding: '4px 8px', background: '#333', color: '#fff' }}>{channel}</div>
      <MessageList theme={theme}>
        <List
          items={messages}
          renderItem={(msg) => (
            <div>
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          )}
          keyExtractor={(msg) => msg.id}
        />
      </MessageList>
      <InputArea theme={theme}>
        <InputField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </InputArea>
    </ChatContainer>
  );
};
