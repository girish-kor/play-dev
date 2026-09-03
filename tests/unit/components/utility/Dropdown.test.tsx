import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from 'src/components/utility/Dropdown';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Dropdown', () => {
  const options = [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }];
  it('opens and selects an option', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider>
        <Dropdown options={options} onChange={onChange} />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Select...'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(onChange).toHaveBeenCalledWith('1');
  });
});
