import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Portal } from '../../utils/Portal';
import { InputField } from '../utility/InputField';
import { List } from '../utility/List';
import { useTheme } from '../../hooks/useTheme';

interface DebugConsoleProps {
  logs: string[];
  commands: Array<{ name: string; handler: (args: string[]) => void }>;
  visible: boolean;
  onCommand: (input: string) => void;
  onClearLogs: () => void;
}

const ConsoleContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: rgba(0, 0, 0, 0.8);
  color: #0f0;
  font-family: monospace;
  padding: ${({ theme }) => theme.spacing.sm};
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndex.debug};
`;

const CommandHint = styled.div`
  opacity: 0.6;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: ${({ theme }) => theme.spacing.xs} 0;
`;

export const DebugConsole: React.FC<DebugConsoleProps> = ({
  logs,
  commands,
  visible,
  onCommand,
  onClearLogs,
}) => {
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  if (!visible) return null;

  return (
    <Portal>
      <ConsoleContainer theme={theme}>
        <div ref={listRef}>
          <List
            items={logs}
            renderItem={(log) => <div>{log}</div>}
            keyExtractor={(_, i) => String(i)}
          />
        </div>
        {commands.length > 0 && (
          <CommandHint theme={theme}>
            Available: {commands.map((c) => c.name).join(', ')}
          </CommandHint>
        )}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <InputField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onCommand(input);
                setInput('');
              }
            }}
            placeholder="Enter command..."
          />
          <button onClick={onClearLogs}>Clear</button>
        </div>
      </ConsoleContainer>
    </Portal>
  );
};
