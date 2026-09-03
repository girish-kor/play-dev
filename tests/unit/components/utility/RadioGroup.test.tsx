import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from 'src/components/utility/RadioGroup';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('RadioGroup', () => {
  const options = [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }];
  it('selects an option', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider>
        <RadioGroup options={options} onChange={onChange} label="Group" />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByLabelText('A'));
    expect(onChange).toHaveBeenCalledWith('a');
  });
});
