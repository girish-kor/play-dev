import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { DialogueBubble } from 'src/components/dialogue/DialogueBubble';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('DialogueBubble', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('displays speaker and text', () => {
    render(
      <ThemeProvider>
        <DialogueBubble speaker="NPC" text="Hello" typingSpeed={1} />
      </ThemeProvider>
    );
    expect(screen.getByText('NPC')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime('Hello'.length * 1 + 1);
    });
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
  it('shows options when complete', () => {
    render(
      <ThemeProvider>
        <DialogueBubble speaker="NPC" text="Hi" options={['Option1']} typingSpeed={1} />
      </ThemeProvider>
    );
    act(() => {
      jest.advanceTimersByTime('Hi'.length * 1 + 1);
    });
    expect(screen.getByText('Option1')).toBeInTheDocument();
  });
});
