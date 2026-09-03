import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from 'src/components/utility/Checkbox';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Checkbox', () => {
  it('toggles when clicked', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider>
        <Checkbox label="Accept" onChange={onChange} />
      </ThemeProvider>
    );
    const checkbox = screen.getByLabelText('Accept');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
