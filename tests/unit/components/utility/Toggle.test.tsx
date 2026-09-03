import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from 'src/components/utility/Toggle';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Toggle', () => {
  it('toggles when clicked', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider>
        <Toggle label="Test" onChange={onChange} />
      </ThemeProvider>
    );
    const checkbox = screen.getByRole('switch');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
