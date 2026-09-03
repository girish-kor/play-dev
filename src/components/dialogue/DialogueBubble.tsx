import React from 'react';
import styled from 'styled-components';
import { useTyping } from '../../hooks/useTyping';
import { useTheme } from '../../hooks/useTheme';
import { Avatar } from '../utility/Avatar';

interface DialogueBubbleProps {
  speaker: string;
  text: string;
  avatar?: string;
  options?: string[];
  typingSpeed?: number;
  onNext?: () => void;
  onOptionSelect?: (option: string) => void;
}

const Bubble = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.lg};
  max-width: 400px;
  box-shadow: ${({ theme }) => theme.shadow.md};
  position: relative;
`;

const Speaker = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Text = styled.p`
  margin: 0;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const DialogueBubble: React.FC<DialogueBubbleProps> = ({
  speaker,
  text,
  avatar,
  options = [],
  typingSpeed = 30,
  onNext,
  onOptionSelect,
}) => {
  const { displayedText, isComplete } = useTyping(text, typingSpeed);
  const theme = useTheme();

  return (
    <Bubble theme={theme}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Avatar src={avatar} size={32} fallback={speaker[0]} />
        <Speaker theme={theme}>{speaker}</Speaker>
      </div>
      <Text>{displayedText}</Text>
      {isComplete && options.length > 0 && (
        <Options theme={theme}>
          {options.map((opt, idx) => (
            <button key={idx} onClick={() => onOptionSelect?.(opt)}>
              {opt}
            </button>
          ))}
        </Options>
      )}
      {isComplete && options.length === 0 && onNext && <button onClick={onNext}>Next</button>}
    </Bubble>
  );
};
