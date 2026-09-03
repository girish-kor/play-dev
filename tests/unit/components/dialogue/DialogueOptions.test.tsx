import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DialogueOptions } from 'src/components/dialogue/DialogueOptions';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('DialogueOptions', () => {
  const options = ['Option1', 'Option2'];
  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn();
    render(
      <ThemeProvider>
        <DialogueOptions options={options} onSelect={onSelect} />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Option1'));
    expect(onSelect).toHaveBeenCalledWith(0);
  });
});
